let api = () => {
	fetch("/api/v2/data")
		.then((res) => res.json())
		.then((data) => {
			let go = () => {
				//? announcement
				for (let i = 0; i < data.course_announcements_id.length; i++) {
					let id

					let element = document.createElement("div")

					for (let j = 0; j < data.course_ids.length; j++) {
						if (data.course_ids[j] == data.course_announcements_id[i]) {
							id = data.course_list[j]
						}
					}

					console.log(id)

					// set div elements
					element.innerHTML = `
						<div class="grid" id="announcements">

						<div class="div1"> 
						<h3>${data.course_announcements_text[i]}</h3>


						<a target="_blank" href="${data.course_announcements_link[i]}" class="button1"  >Link</a>
						</div>

						<br />

						<h3>${id}</h3>

						</div>`

					// set div in html
					document.querySelector(".center").appendChild(element)
				}

				//? coursework
				for (let i = 0; i < data.course_coursework_id.length; i++) {
					let id

					let element = document.createElement("div")

					for (let j = 0; j < data.course_ids.length; j++) {
						if (data.course_ids[j] == data.course_coursework_id[i]) {
							id = data.course_list[j]
						}
					}

					if (data.course_coursework_text[i] == "undefined") {
						data.course_coursework_text[i] = ""
					}

					// set div elements
					element.innerHTML = `
						<div class="grid" id="coursework">

						<div class="div1"> 
						<h2>${data.course_coursework_title[i]}</h3>
						<h3>${data.course_coursework_text[i]}</h3>

						<a target="_blank" href="${data.course_coursework_link[i]}" class="button1"  >Link</a>
						</div>

						<br />

						<h3>${id}</h3>

						</div>`

					// set div in html
					document.querySelector(".center").appendChild(element)
				}

				//? coursematerial
				for (let i = 0; i < data.course_courseworkmaterial_id.length; i++) {
					let id

					let element = document.createElement("div")

					for (let j = 0; j < data.course_ids.length; j++) {
						if (data.course_ids[j] == data.course_courseworkmaterial_id[i]) {
							id = data.course_list[j]
						}
					}

					// set div elements
					element.innerHTML = `
						<div class="grid" id="courseworkmaterial">

						<div class="div1"> 
						<h2>${data.course_courseworkmaterial_title[i]}</h3>
						
						<a target="_blank" href="${data.course_courseworkmaterial_link[i]}" class="button1"  >Link</a>
						</div>

						<br />

						<h3>${id}</h3>

						</div>`

					// set div in html
					document.querySelector(".center").appendChild(element)
				}

				document.querySelector(".center").style.height = "auto"
				document.querySelector(".center").style.width = "1500px"
				document.querySelector(".container0").style.display = "none"
				document.querySelector(".container1").style.display = "block"

				//? cookies
				let cookies = document.cookie
					.split(";")
					.map((cookie) => cookie.split("="))
					.reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {})

				console.log(cookies)

				if (cookies.style0 == "true") {
					document.getElementById("cb0").checked = false

					c0 = false

					style0()
				}

				if (cookies.style1 == "true") {
					document.getElementById("cb1").checked = false

					c1 = false

					style1()
				}

				if (cookies.style2 == "true") {
					document.getElementById("cb2").checked = false

					c2 = false

					style2()
				}
			}

			console.log(data)
			go()
		})
}

let c0 = false
let c1 = false
let c2 = false

let cb0 = document.querySelector("#cb0")
let cb1 = document.querySelector("#cb1")
let cb2 = document.querySelector("#cb2")

cb0.addEventListener("change", () => {
	style0()
})

cb1.addEventListener("change", () => {
	style1()
})

cb2.addEventListener("change", () => {
	style2()
})

let style0 = () => {
	if (c0 == true) {
		let e = document.querySelectorAll("#announcements")

		for (let i = 0; i < e.length; i++) {
			e[i].style.display = "grid"
		}

		c0 = false

		document.cookie = "style0=false"
	} else {
		let e = document.querySelectorAll("#announcements")

		for (let i = 0; i < e.length; i++) {
			e[i].style.display = "none"
		}

		c0 = true

		document.cookie = "style0=true"
	}
}

let style1 = () => {
	if (c1 == true) {
		let e = document.querySelectorAll("#coursework")

		for (let i = 0; i < e.length; i++) {
			e[i].style.display = "grid"
		}

		c1 = false

		document.cookie = "style1=false"
	} else {
		let e = document.querySelectorAll("#coursework")

		for (let i = 0; i < e.length; i++) {
			e[i].style.display = "none"
		}

		c1 = true

		document.cookie = "style1=true"
	}
}

let style2 = () => {
	if (c2 == true) {
		let e = document.querySelectorAll("#courseworkmaterial")

		for (let i = 0; i < e.length; i++) {
			e[i].style.display = "grid"
		}

		c2 = false

		document.cookie = "style2=false"
	} else {
		let e = document.querySelectorAll("#courseworkmaterial")

		for (let i = 0; i < e.length; i++) {
			e[i].style.display = "none"
		}

		c2 = true

		document.cookie = "style2=true"
	}
}
