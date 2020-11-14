let id0
let id1
let state0 = 0
let state1 = 0

let c0 = false
let c1 = false

let cb0 = document.querySelector("#cb0")
let cb1 = document.querySelector("#cb1")

let api = () => {
	fetch("/api/v2/data")
		.then((res) => res.json())
		.then((data) => {
			let go = () => {
				//? work
				for (let i = 0; i < data.course_coursework_id.length; i++) {
					let element = document.createElement("div")

					for (let j = 0; j < data.course_ids.length; j++) {
						if (data.course_ids[j] == data.course_coursework_id[i]) {
							id0 = data.course_list[j]
						}
					}

					if (data.course_coursework_text[i] == "undefined") {
						data.course_coursework_text[i] = ""
					}

					for (let k = 0; k < data.course_studentsubmission_uniqid.length; k++) {
						if (data.course_studentsubmission_uniqid[k] == data.course_coursework_uniqid[i]) {
							id1 = data.course_studentsubmission_state[k]
						}
					}

					if (id1 == "CREATED") {
						id1 = "Kiadva"
						state0 = "state0"
						state1 = "created"
					} else {
						id1 = "Leadva"
						state0 = "state1"
						state1 = "turnedin"
					}

					// set div elements
					element.innerHTML = `
						<div class="grid" id="${state1}">

						<div class="div1"> 
						<h2>${data.course_coursework_title[i]}</h3>
						<h3>${data.course_coursework_text[i]}</h3>

						<p class="text1" id="${state0}">${id1}</text1>

						<br />
						<br />

						<a target="_blank" href="${data.course_coursework_link[i]}" class="button1"  >Link</a>

						<br />

						<h3>${id0}</h3>
						</div>

						</div>`

					// set div in html
					document.querySelector(".center").appendChild(element)
				}

				let e0 = document.querySelectorAll("#state0")
				let e1 = document.querySelectorAll("#state1")

				for (let i = 0; i < e0.length; i++) {
					e0[i].style.color = "red"
				}

				for (let i = 0; i < e1.length; i++) {
					e1[i].style.color = "green"
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
			}

			console.log(data)
			go()
		})
}

cb0.addEventListener("change", () => {
	style0()
})

cb1.addEventListener("change", () => {
	style1()
})

let style0 = () => {
	if (c0 == true) {
		let e = document.querySelectorAll("#created")

		for (let i = 0; i < e.length; i++) {
			e[i].style.display = "grid"
		}

		c0 = false

		document.cookie = "style0=false"
	} else {
		let e = document.querySelectorAll("#created")

		for (let i = 0; i < e.length; i++) {
			e[i].style.display = "none"
		}

		c0 = true

		document.cookie = "style0=true"
	}

	console.log(document.cookie)
}

let style1 = () => {
	if (c1 == true) {
		let e = document.querySelectorAll("#turnedin")

		for (let i = 0; i < e.length; i++) {
			e[i].style.display = "grid"
		}

		c1 = false

		document.cookie = "style1=false"
	} else {
		let e = document.querySelectorAll("#turnedin")

		for (let i = 0; i < e.length; i++) {
			e[i].style.display = "none"
		}

		c1 = true

		document.cookie = "style1=true"
	}

	console.log(document.cookie)
}
