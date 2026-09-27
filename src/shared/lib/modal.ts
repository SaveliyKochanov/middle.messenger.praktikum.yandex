export function initModals() {
  document.addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof Element)) {
      return;
    }

    const opener = target.closest<HTMLElement>("[data-modal-open]");
    if (opener) {
      const modal = document.getElementById(opener.dataset.modalOpen ?? "");
      if (modal instanceof HTMLDialogElement) {
        opener.closest<HTMLElement>("[popover]")?.hidePopover();
        modal.showModal();
      }
      return;
    }

    const closer = target.closest("[data-modal-close]");
    if (closer) {
      closer.closest("dialog")?.close();
      return;
    }

    if (target instanceof HTMLDialogElement) {
      target.close();
    }
  });
}
