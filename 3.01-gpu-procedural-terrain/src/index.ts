import App from './App'

function main() {
  const canvas = document.getElementById('renderCanvas')

  if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
    throw new TypeError('canvas not found')
  }

  new App(canvas).run()
}

main()

export default {}
