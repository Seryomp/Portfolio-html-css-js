  // Si on vient de se connecter
  const params = new URLSearchParams(window.location.search);
  if (params.has('connected')) {
    onUserConnected();
  }