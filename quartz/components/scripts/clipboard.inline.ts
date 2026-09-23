const svgCopy =
  '<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true"><path fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path></svg>'
const svgCheck =
  '<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true"><path fill-rule="evenodd" fill="rgb(63, 185, 80)" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg>'

document.addEventListener("nav", () => {
  const els = document.getElementsByTagName("pre")

  for (let i = 0; i < els.length; i++) {
    const codeBlock = els[i].getElementsByTagName("code")[0]

    if (codeBlock) {
      const source = (
        codeBlock.dataset.clipboard ? JSON.parse(codeBlock.dataset.clipboard) : codeBlock.innerText
      ).replace(/\n\n/g, "\n")

      const button = document.createElement("button")
      button.className = "clipboard-button"
      button.type = "button"
      button.innerHTML = svgCopy
      button.ariaLabel = "Copy source"

      function onClick() {
        navigator.clipboard.writeText(source).then(
          () => {
            button.blur()
            button.innerHTML = svgCheck

            setTimeout(() => {
              button.innerHTML = svgCopy
              button.style.borderColor = ""
            }, 2000)
          },
          (error) => console.error(error),
        )
      }

      button.addEventListener("click", onClick)

      window.addCleanup(() => {
        button.removeEventListener("click", onClick)
      })

      els[i].prepend(button)
    }
  }

  // Cambiar el título de las notas al pie
  const footnoteHeading = document.querySelector(
    "#quartz-body #footnote-label",
  ) as HTMLElement | null

  if (footnoteHeading) {
    footnoteHeading.textContent = "Referencias"
  }
})

// ==============================
// Lightbox para imágenes
// ==============================

let imageLightbox: HTMLDivElement | null = null
let imageLightboxImage: HTMLImageElement | null = null

function closeImageLightbox() {
  if (!imageLightbox) return

  imageLightbox.classList.remove("active")
  document.body.classList.remove("image-lightbox-open")
}

function openImageLightbox(src: string, alt: string) {
  if (!imageLightbox) {
    imageLightbox = document.createElement("div")
    imageLightbox.className = "image-lightbox"

    imageLightbox.innerHTML = `
      <button
        class="image-lightbox-close"
        type="button"
        aria-label="Cerrar imagen"
      >
        ×
      </button>

      <img
        class="image-lightbox-image"
        alt=""
      />
    `

    document.body.appendChild(imageLightbox)

    imageLightboxImage = imageLightbox.querySelector(
      ".image-lightbox-image",
    ) as HTMLImageElement

    const closeButton = imageLightbox.querySelector(
      ".image-lightbox-close",
    ) as HTMLButtonElement

    closeButton.addEventListener("click", closeImageLightbox)

    imageLightbox.addEventListener("click", (event) => {
      if (event.target === imageLightbox) {
        closeImageLightbox()
      }
    })

    window.addCleanup(() => {
      closeButton.removeEventListener("click", closeImageLightbox)
      imageLightbox?.remove()
      imageLightbox = null
      imageLightboxImage = null
      document.body.classList.remove("image-lightbox-open")
    })
  }

  if (!imageLightboxImage) return

  imageLightboxImage.src = src
  imageLightboxImage.alt = alt
  imageLightbox.classList.add("active")
  document.body.classList.add("image-lightbox-open")
}

function handleImageClick(event: MouseEvent) {
  const image = event.currentTarget as HTMLImageElement

  event.preventDefault()

  openImageLightbox(image.src, image.alt)
}

document.addEventListener("nav", () => {
  const images = document.querySelectorAll(
    "#quartz-body img",
  ) as NodeListOf<HTMLImageElement>

  images.forEach((image) => {
    image.style.cursor = "zoom-in"

    image.addEventListener("click", handleImageClick)

    window.addCleanup(() => {
      image.removeEventListener("click", handleImageClick)
    })
  })
})

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeImageLightbox()
  }
})
