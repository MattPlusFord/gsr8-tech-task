import './commands'

import { mount } from 'cypress/react18'
import {ReactNode} from "react";
import { MemoryRouter, MemoryRouterProps} from "react-router-dom";
import ErrorBoundary from "../../src/components/errors/ErrorBoundary.tsx";

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
      mountWith: typeof mountWith;
    }
  }
}

type MountOptions = {
  router?: MemoryRouterProps;
};

export enum MountLayer {
  Router = "Router",
  ErrorBoundary = "ErrorBoundary",
}

function addRouterWrappedNode(component: ReactNode, routerOptions?: MountOptions['router']) {
    return (
        <MemoryRouter initialEntries={routerOptions?.initialEntries ? routerOptions.initialEntries : []}>
          {component}
        </MemoryRouter>
    )
}

function addErrorBoundaryWrappedNode(component: ReactNode) {
    return (
        <ErrorBoundary supportUrl={'https://support.ford.com'}>
            {component}
        </ErrorBoundary>
    )
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

  if (mountLayers.includes(MountLayer.ErrorBoundary)) {
    mountComponents = distinctLayerMount(MountLayer.ErrorBoundary, (node: ReactNode) => addErrorBoundaryWrappedNode(node));
  }

  cy.mount(mountComponents);
}


Cypress.Commands.add('mount', mount)
Cypress.Commands.add('mountWith', mountWith)


