
export function copyToClipboard(input) {
  const dummy = document.createElement("textarea");
  document.body.appendChild(dummy);
  dummy.value = input.toString();
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}

// Simulates synchronous sleep function.
export async function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
