export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    // fallback abaixo
  }

  // Fallback para ambientes sem Clipboard API ou sem contexto seguro
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'absolute'
  textarea.style.left = '-9999px'
  document.body.appendChild(textarea)
  textarea.select()
  try {
    const successful = document.execCommand('copy')
    document.body.removeChild(textarea)
    return successful
  } catch {
    document.body.removeChild(textarea)
    return false
  }
}
