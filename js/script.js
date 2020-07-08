// {
//     "sessionTitle": "",
//     "sessionDate": "",
//     "sessionTime": "",
//     "skillLevel": "",
//     "sessionDescription": "",
//     "sessionPreReq": [],
//     "sessionOutcomes": [],
//     "sessionRegisterLink": "",
//     "sessionLink": "course-____",
//     "instructorName": "",
//     "instructorBio": "",
//     "instructorImg": ""
// }
fetch("./json/data.json")
    .then(res => res.json())
    .then(data => {
        // console.log(data)
        populateSchedule(data)
        populateCourses(data)
    }).catch(err => {
        console.error(err)
    })

function setCurrentYear() {
    const footerYear = document.querySelector("#footerYear")
    // const headerYear = document.querySelector("#headerYear")

    let date = new Date()
    // headerYear.innerText = `Summer ${date.getFullYear()}`
    footerYear.innerHTML = `<p>&copy; ${date.getFullYear()}</p>`
}

setCurrentYear()

function populateSchedule(data) {
    const scheduleContainer = document.querySelector("#sessionSchedule")
    let output = ''

    for (let i = 0; i < data.length; i++) {
        let sessionTitle = data[i].sessionTitle
        let sessionDateTime = data[i].sessionDate + " " + data[i].sessionTime
        let learnMoreLink = data[i].sessionLink

        output += `<div class="session-schedule__course">
                        <h2>${sessionTitle}</h2>
                        <p class="descriptive-text">${sessionDateTime}</p>
                        <div class="session-schedule__learn-more">
                            <a href="#${learnMoreLink}" title="Click to see course description">Learn More >></a>
                        </div>
                    </div>`

        scheduleContainer.innerHTML = output
    }
}

function populateCourses(data) {
    const coursesContainer = document.querySelector("#coursesContainer")
    let output = ''

    for (let i = 0; i < data.length; i++) {
        let sessionTitle = data[i].sessionTitle
        let skillLevel = data[i].skillLevel
        let sessionDate = data[i].sessionDate
        let sessionTime = data[i].sessionTime
        let sessionDescription = data[i].sessionDescription
        let instructorName = data[i].instructorName

        let instructorImg = ''
        if (data[i].instructorImg !== null) {
            instructorImg = data[i].instructorImg
        } else {
            instructorImg = "./img/anonymous.png"
        }

        let instructorBio = data[i].instructorBio
        let sessionRegisterLink = data[i].sessionRegisterLink

        let sessionPreReq = () => {
            let preReqs = '<ul>'
            for (let j = 0; j < data[i].sessionPreReq.length; j++) {
                preReqs += `<li>${data[i].sessionPreReq[j]}</li>`
            }
            preReqs += '</ul>'
            return preReqs
        }

        let sessionOutcomes = () => {
            let outcomes = '<ul>'
            for (let j = 0; j < data[i].sessionOutcomes.length; j++) {
                outcomes += `<li>${data[i].sessionOutcomes[j]}</li>`
            }
            outcomes += '</ul>'
            return outcomes
        }

        output +=
            `<div id="course-${[i + 1]}" class="course course-${[i]}">
                <div class="course-header">
                    <h1>${sessionTitle}</h1>
                    <div class="course-metadata">
                        <p class="descriptive-text"><span class=underline-text>Skill Level</span> - ${skillLevel}</p>
                        <p class="descriptive-text"><span class=underline-text>Date</span> - ${sessionDate}</p>
                        <p class="descriptive-text"><span class=underline-text>Time</span> - ${sessionTime}</p>
                    </div>
                </div>

                <div class="course-about">
                    <h2>About this Session</h2>
                    <p>${sessionDescription}</p>
                </div>

                <div class="course-instructor">
                    <h2>Your Instructor - ${instructorName}</h2>
                    <div class="instructor__bio-img">
                        <p><img src="${instructorImg}" alt="${instructorName}"> ${instructorBio}</p>
                    </div>
                </div>

                <div class="course-prereq">
                    <h2>What You Should Know Before Attending this Session</h2>
                    ${sessionPreReq()}
                </div>

                <div class="course-outcomes">
                    <h2>Learning Outcomes</h2>
                    ${sessionOutcomes()}
                </div>

                <div class="course-register">
                    <button class="btn"><a class="btn-register" href="${sessionRegisterLink}" style="color:white">Register</a></button>
                </div>
            </div>`

        coursesContainer.innerHTML = output
    }
}