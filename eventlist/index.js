const API = (() => { // all cap for const value
    const URL = "http://localhost:3000/events";

    const getEvents = () => {
        return fetch(URL).then(res=>res.json());
    }

    const postEvent = (newEvent) => {
        return fetch(URL,{
            method:"POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(newEvent)
        }).then(res=>res.json())
    }

    const removeEvent = (id) => {
        return fetch(`${URL}/${id}`, {
            method: "DELETE",
        }).then(res=>res.json());
    }

    return {
        getEvents,
        postEvent,
        removeEvent
    }
})()
    
/* test */
// API.removeEvent(1)

// API.postEvent({title:"cook"}).then(data=>{
//     console.log(data)
// })

API.getEvents().then(events=>{
    console.log(events);
})

class EventModel {
    #events;
    #id;
    constructor() {
        this.#id = 1;
        this.#events = [];
        this.fetchEvents();
    }

    fetchEvents() {
        API.getEvents().then((data) => {
            this.#events = data;
        })
    }

    getEvents() {
        return this.#events
    }

    addEvent(newEvent) {
        API.postEvent(newEvent).then(data=> {
            this.#events.push(data);
        })
    }

    removeEvent(id) {
        API.removeEvent(id).then(data=>{
            const temp = this.#events.filter((event) => event.id !== id); 
            this.#events = temp; 
        })
    }
}

const events = [
    {
      "eventName": "Music Festival",
      "startDate": "2023-01-20",
      "endDate": "2023-01-21",
      "id": 1
    },
    {
      "eventName": "Food Festival",
      "startDate": "2023-02-01",
      "endDate": "2023-02-02",
      "id": 2
    }
]

class EventView {
    constructor() {
        this.addBtn = document.querySelector(".event-list-app__btn-add");
        this.eventList = document.querySelector(".event-table_body");
    }
    
    renderEvents(events) {
        events.forEach(this.renderEvent.bind(this));
    }

    renderEvent(event) {
        const eventElem = document.createElement("tr");
        eventElem.classList.add("event");

        const eventNameElem = document.createElement("td");
        eventNameElem.classList.add("event_name");
        eventNameElem.textContent = event.eventName;

        const startDateElem = document.createElement("td");
        startDateElem.classList.add("event_start");
        startDateElem.textContent = event.startDate;

        const endDateElem = document.createElement("td");
        endDateElem.classList.add("event_end");
        endDateElem.textContent = event.endDate;

        const eventActionsElem = document.createElement("td");
        eventActionsElem.classList.add("event_actions");

        const editButton = document.createElement("button");
        editButton.classList.add("edit-button");

        const editSvg = document.createElement("svg");
        editSvg.setAttribute("d", "")

        editButton.appendChild(editSvg);

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");

        eventActionsElem.appendChild(editButton);
        eventActionsElem.appendChild(deleteButton);

        eventElem.appendChild(eventNameElem);
        eventElem.appendChild(startDateElem);
        eventElem.appendChild(endDateElem);
        eventElem.appendChild(eventActionsElem);

        this.eventList.append(eventElem);
    }
}

class EventController {
    constructor() {}
}

const eventModel = new EventModel();
const eventView = new EventView();
// const eventController = new EventController(eventView, eventModel);

eventView.renderEvents(events);

// eventModel.addEvent({
//     title: "cook"
// })

// eventModel.removeEvent(1);
// console.log(eventModel.getEvents())

// for (let i = 0; i<12; i++) {
//     API.removeEvent(i);
// }
