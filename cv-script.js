/* CV Script - Minimal interactions (print, export) */

document.addEventListener('DOMContentLoaded', function() {
  // Print button functionality
  const printButton = document.querySelector('.print-btn');
  if (printButton) {
    printButton.addEventListener('click', function() {
      window.print();
    });
  }

  // Add smooth scroll behavior
  document.documentElement.style.scrollBehavior = 'smooth';

  // Optional: Add date dynamically
  const dateElement = document.querySelector('.cv-footer p');
  if (dateElement) {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
    dateElement.innerHTML = `Document généré le ${formattedDate} | Tous droits réservés © Sayouri Fatima Ezzahra`;
  }

  // Add print shortcut (Ctrl+P or Cmd+P)
  document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
      e.preventDefault();
      window.print();
    }
  });
});
