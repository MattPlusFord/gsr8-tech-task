import './commands'

import { mount } from 'cypress/react18'
import {ReactNode} from "react";
import {BrowserRouter, MemoryRouter} from "react-router-dom";

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
      mountWith: typeof mountWith;
    }
  }
}

type MountOptions = {
  router?: {type: "browser"} | {type: "memory"; initialEntries: string[]};
};

export enum MountLayer {
  Router = "Router",
}

function addRouterWrappedNode(component: ReactNode, routerOptions?: MountOptions['router']) {
  if (routerOptions && routerOptions.type === "memory") {
    return (
        <MemoryRouter initialEntries={routerOptions.initialEntries ? routerOptions.initialEntries : []}>
          {component}
        </MemoryRouter>
    )
  }
  return (<BrowserRouter>{component}</BrowserRouter>)
}

function mountWith(component: ReactNode, mountLayers: MountLayer[], mountOptions?: MountOptions) {
  let mountComponents = component;
  let layers = [...mountLayers];

  function distinctLayerMount(mountlayer: MountLayer, mountFn: (node: ReactNode) => ReactNode) {
    layers = layers.filter((layer) => layer !== mountlayer); // prevent component from wrapping more than once
    return mountFn(mountComponents);
  }

  if (mountLayers.includes(MountLayer.Router)) {
    mountComponents = distinctLayerMount(MountLayer.Router, (node: ReactNode) => addRouterWrappedNode(node, mountOptions?.router));
  }

  cy.mount(mountComponents);
}


Cypress.Commands.add('mount', mount)
Cypress.Commands.add('mountWith', mountWith)


