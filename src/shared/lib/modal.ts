export function openModal(id: string) {
  const modal = document.getElementById(id);

  if (modal instanceof HTMLDialogElement) {
    modal.showModal();
  }
}
