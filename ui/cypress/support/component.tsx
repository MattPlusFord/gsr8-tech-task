import './commands'
import "@cypress/code-coverage/support";
import { mount } from 'cypress/react18'
import {ReactNode} from "react";
import {MemoryRouter, MemoryRouterProps, Route, Routes} from "react-router-dom";
import ErrorBoundary from "../../src/components/errors/ErrorBoundary.tsx";
import {RouteConfig} from "../../src/components/config/AppRoutes.tsx";

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
      mountWith: typeof mountWith;
    }
  }
}

type MountOptions = {
  router?: MemoryRouterProps & Partial<{routes: RouteConfig[]}>;
};

export enum MountLayer {
  Router = "Router",
  ErrorBoundary = "ErrorBoundary",
  Routes = "Routes",
}

function addRoutes(component: ReactNode, routes?: RouteConfig[]) {
    if (!routes || routes.length === 0) {
        return component;
    }

    return (
        <>
            {component}
            <Routes>
                {routes.map((route) => (
                    <Route key={route.path} path={route.path} element={route.component} />
                ))}
            </Routes>
        </>
    )
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

  if (mountLayers.includes(MountLayer.Routes)) {
    mountComponents = distinctLayerMount(MountLayer.Routes, (node: ReactNode) => addRoutes(node, mountOptions?.router?.routes));
  }

  if (mountLayers.includes(MountLayer.Router) || mountLayers.includes(MountLayer.Routes)) {
    mountComponents = distinctLayerMount(MountLayer.Router, (node: ReactNode) => addRouterWrappedNode(node, mountOptions?.router));
  }

  if (mountLayers.includes(MountLayer.ErrorBoundary)) {
    mountComponents = distinctLayerMount(MountLayer.ErrorBoundary, (node: ReactNode) => addErrorBoundaryWrappedNode(node));
  }

  cy.mount(mountComponents);
}


Cypress.Commands.add('mount', mount)
Cypress.Commands.add('mountWith', mountWith)


