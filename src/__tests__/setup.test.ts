/**
 * Test de verificación del entorno.
 *
 * Confirma que Vitest, jsdom y @testing-library/jest-dom están
 * configurados correctamente. Este test se puede eliminar una vez
 * que existan tests reales en el proyecto.
 */
describe('Entorno de testing', () => {
  /*
   * Qué se busca: Verificar que Vitest está correctamente configurado con
   *               el entorno jsdom, lo que permite simular el DOM del
   *               navegador en los tests sin necesidad de un navegador real.
   * Resultado esperado: El objeto global document está definido, confirmando
   *                     que jsdom está activo como entorno de ejecución.
   */
  it('Vitest ejecuta correctamente con jsdom', () => {
    expect(document).toBeDefined()
  })

  /*
   * Qué se busca: Verificar que los matchers personalizados de
   *               @testing-library/jest-dom (como toBeInTheDocument) están
   *               disponibles y funcionan correctamente en el entorno.
   * Resultado esperado: Un elemento DOM creado y agregado al body es
   *                     detectado por el matcher toBeInTheDocument sin
   *                     errores.
   */
  it('jest-dom matchers están disponibles', () => {
    const element = document.createElement('div')
    document.body.appendChild(element)
    expect(element).toBeInTheDocument()
    document.body.removeChild(element)
  })
})
