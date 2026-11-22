export function navigate(path: string) {
  if (path !== location.pathname) {
    history.pushState({}, "", path);
  }

  window.dispatchEvent(new PopStateEvent("popstate"));
}
