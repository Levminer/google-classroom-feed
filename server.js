const express = require("express")
const path = require("path")
const fs = require("fs")
const { google } = require("googleapis")

// initialize
const app = express()
const port = process.env.PORT_ || 8080

// ejs
app.set("view engine", "ejs")

// path
app.use(express.static(path.join(__dirname, "/views")))

// partials
const app_version = "1.0.0"
const api_version = "V2"

app.locals.app_version = app_version
app.locals.api_version = api_version

// routes
app.get("/", (req, res) => {
	res.render("index", {})
})

app.get("/work", (req, res) => {
	res.render("work", {})
})

app.get("/api/v1/data", (req, res) => {
	res.status(403)
	res.json({
		error: 403,
	})
	res.end()
})

// api
app.get("/api/v2/data", (req, res) => {
	const course_list = []
	const course_ids = []

	const course_announcements_text = []
	const course_announcements_id = []
	const course_announcements_link = []

	const course_coursework_title = []
	const course_coursework_text = []
	const course_coursework_id = []
	const course_coursework_link = []
	const course_coursework_uniqid = []

	const course_courseworkmaterial_title = []
	const course_courseworkmaterial_link = []
	const course_courseworkmaterial_id = []

	const course_studentsubmission_state = []
	const course_studentsubmission_id = []
	const course_studentsubmission_uniqid = []

	const TOKEN_PATH = "token.json"

	fs.readFile("credentials.json", (err, content) => {
		if (err) return console.log("Error loading client secret file:", err)
		authorize(JSON.parse(content), listCourses)
	})

	let authorize = (credentials, callback) => {
		const { client_secret, client_id, redirect_uris } = credentials.installed
		const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])

		fs.readFile(TOKEN_PATH, (err, token) => {
			oAuth2Client.setCredentials(JSON.parse(token))
			callback(oAuth2Client)
		})
	}

	let listCourses = (auth) => {
		const classroom = google.classroom({ version: "v1", auth })
		classroom.courses.list(
			{
				pageSize: 20,
				courseStates: "ACTIVE",
			},
			(err, res) => {
				if (err) return console.error("The API returned an error: " + err)

				let courses = res.data.courses
				if (courses && courses.length) {
					courses.forEach((course) => {
						course_list.push(`${course.name}`)
						course_ids.push(`${course.id}`)
					})
				} else {
					console.log("No courses found.")
				}
				countinue()
			}
		)

		let countinue = () => {
			for (let i = 0; i < course_ids.length; i++) {
				//? announcements
				classroom.courses.announcements.list(
					{
						courseId: course_ids[i],
					},
					(err, res) => {
						if (err) return console.error("The API returned an error: " + err)

						let courses = res.data.announcements
						if (courses && courses.length) {
							courses.forEach((course) => {
								course_announcements_text.push(`${course.text}`)
								course_announcements_id.push(`${course_ids[i]}`)
								course_announcements_link.push(`${course.alternateLink}`)
							})
						}
					}
				)

				//? courseworks
				classroom.courses.courseWork.list(
					{
						courseId: course_ids[i],
					},
					(err, res) => {
						if (err) return console.error("The API returned an error: " + err)

						let courses = res.data.courseWork
						if (courses && courses.length) {
							courses.forEach((course) => {
								course_coursework_text.push(`${course.description}`)
								course_coursework_id.push(`${course_ids[i]}`)
								course_coursework_title.push(`${course.title}`)
								course_coursework_link.push(`${course.alternateLink}`)
								course_coursework_uniqid.push(`${course.id}`)
							})
						}
					}
				)

				//? coursematerials
				classroom.courses.courseWorkMaterials.list(
					{
						courseId: course_ids[i],
					},
					(err, res) => {
						if (err) return console.error("The API returned an error: " + err)

						let courses = res.data.courseWorkMaterial

						if (courses && courses.length) {
							courses.forEach((course) => {
								course_courseworkmaterial_title.push(`${course.title}`)
								course_courseworkmaterial_id.push(`${course_ids[i]}`)
								course_courseworkmaterial_link.push(`${course.alternateLink}`)
							})
						}
					}
				)

				//? studentsubmission
				classroom.courses.courseWork.studentSubmissions.list(
					{
						courseId: course_ids[i],
						courseWorkId: "-",
					},
					(err, res) => {
						if (err) return console.error("The API returned an error: " + err)

						let courses = res.data.studentSubmissions

						if (courses && courses.length) {
							courses.forEach((course) => {
								course_studentsubmission_id.push(`${course_ids[i]}`)
								course_studentsubmission_state.push(`${course.state}`)
								course_studentsubmission_uniqid.push(`${course.courseWorkId}`)
							})
						}
					}
				)
			}
		}
	}

	setTimeout(() => {
		final()
	}, 5000)

	let final = () => {
		res.json({
			course_list,
			course_ids,
			course_announcements_text,
			course_announcements_id,
			course_announcements_link,
			course_coursework_text,
			course_coursework_id,
			course_coursework_title,
			course_coursework_link,
			course_coursework_uniqid,
			course_courseworkmaterial_title,
			course_courseworkmaterial_id,
			course_courseworkmaterial_link,
			course_studentsubmission_id,
			course_studentsubmission_state,
			course_studentsubmission_uniqid,
		})

		res.end()
	}
})

// 404
app.use((req, res, next) => {
	res.status(404).render("404", {})
})

//start server
app.listen(port)
console.log(`Server started`)
