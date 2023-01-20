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
        this.eventNameInput = document.querySelector(".event-name-input");
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

        const editSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        editSvg.setAttribute("focusable", "false");
        editSvg.setAttribute("aria-hidden", "true");
        editSvg.setAttribute("viewBox", "0 0 24 24");
        editSvg.setAttribute("data-testid", "EditIcon");
        editSvg.setAttribute("aria-label", "fontSize small");
        editButton.appendChild(editSvg);

        const editPath = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        editPath.setAttribute("fill", "#f0f0f0");
        editPath.setAttribute("d", "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z");
        editSvg.appendChild(editPath);

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");

        const deleteSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        deleteSvg.setAttribute("focusable", "false");
        deleteSvg.setAttribute("aria-hidden", "true");
        deleteSvg.setAttribute("viewBox", "0 0 24 24");
        deleteSvg.setAttribute("data-testid", "DeleteIcon");
        deleteSvg.setAttribute("aria-label", "fontSize small");
        deleteButton.appendChild(deleteSvg);

        const deletePath = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        deletePath.setAttribute("fill", "#f0f0f0");
        deletePath.setAttribute("d", "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z");
        deleteSvg.appendChild(deletePath);

        eventActionsElem.appendChild(editButton);
        eventActionsElem.appendChild(deleteButton);

        eventElem.appendChild(eventNameElem);
        eventElem.appendChild(startDateElem);
        eventElem.appendChild(endDateElem);
        eventElem.appendChild(eventActionsElem);

        this.eventList.append(eventElem);
    }

    renderAddEvent() {
        const addEventElem = document.createElement("tr");
        addEventElem.classList.add("add-event");

        const eventNameElem = document.createElement("td");
        eventNameElem.classList.add("event-name-input");
        const inputNameElem = document.createElement("input");
        eventNameElem.appendChild(inputNameElem);

        const startDateElem = document.createElement("td");
        startDateElem.classList.add("event-start-input");
        const inputStartElem = document.createElement("input");
        inputStartElem.setAttribute("type", "date");
        startDateElem.appendChild(inputStartElem);

        const endDateElem = document.createElement("td");
        endDateElem.classList.add("event-end-input");
        const inputEndElem = document.createElement("input");
        inputEndElem.setAttribute("type", "date");
        endDateElem.appendChild(inputEndElem);

        const eventActionsElem = document.createElement("td");
        eventActionsElem.classList.add("event-actions-input");

        const addButton = document.createElement("button");
        addButton.classList.add("add-button");

        const addSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        addSvg.setAttribute("focusable", "false");
        addSvg.setAttribute("aria-hidden", "true");
        addSvg.setAttribute("viewBox", "0 0 24 24");
        addSvg.setAttribute("data-testid", "AddIcon");
        addSvg.setAttribute("aria-label", "fontSize small");
        addButton.appendChild(addSvg);

        const addPath = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        addPath.setAttribute("stroke", "#FFFFFF");
        addPath.setAttribute("stroke-width", "4");
        addPath.setAttribute("stroke-linecap", "round");
        addPath.setAttribute("stroke-linejoin", "round");
        addPath.setAttribute("d", "M12 6V18M18 12H6");
        addSvg.appendChild(addPath);

        const cancelButton = document.createElement("button");
        cancelButton.classList.add("delete-button");

        const cancelSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        cancelSvg.setAttribute("focusable", "false");
        cancelSvg.setAttribute("aria-hidden", "true");
        cancelSvg.setAttribute("viewBox", "0 0 32 32");
        cancelSvg.setAttribute("version", "1.1");
        cancelSvg.setAttribute("aria-label", "fontSize small");
        cancelButton.appendChild(cancelSvg);

        const cancelPath = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        cancelPath.setAttribute("fill", "#f0f0f0");
        cancelPath.setAttribute("d", "M19.587 16.001l6.096 6.096c0.396 0.396 0.396 1.039 0 1.435l-2.151 2.151c-0.396 0.396-1.038 0.396-1.435 0l-6.097-6.096-6.097 6.096c-0.396 0.396-1.038 0.396-1.434 0l-2.152-2.151c-0.396-0.396-0.396-1.038 0-1.435l6.097-6.096-6.097-6.097c-0.396-0.396-0.396-1.039 0-1.435l2.153-2.151c0.396-0.396 1.038-0.396 1.434 0l6.096 6.097 6.097-6.097c0.396-0.396 1.038-0.396 1.435 0l2.151 2.152c0.396 0.396 0.396 1.038 0 1.435l-6.096 6.096z");
        cancelSvg.appendChild(cancelPath);

        eventActionsElem.appendChild(addButton);
        eventActionsElem.appendChild(cancelButton);

        addEventElem.appendChild(eventNameElem);
        addEventElem.appendChild(startDateElem);
        addEventElem.appendChild(endDateElem);
        addEventElem.appendChild(eventActionsElem);

        this.eventList.append(addEventElem);
    }
}

class EventController {
    constructor(view, model) {
        this.view = view;
        this.model = model;
        this.setUpEvents();
    }

    setUpEvents() {
        this.handleAdd();
    }

    handleAdd() {
        this.view.addBtn.addEventListener("click", e=>{
            console.log("haha");
            e.preventDefault();
            this.view.renderAddEvent();

            const input = this.view.eventNameInput;
            console.log(input)
        })
    }
}

const eventModel = new EventModel();
const eventView = new EventView();
const eventController = new EventController(eventView, eventModel);

eventView.renderEvents(events);

// eventModel.addEvent({
//     title: "cook"
// })

// eventModel.removeEvent(1);
// console.log(eventModel.getEvents())

// for (let i = 0; i<12; i++) {
//     API.removeEvent(i);
// }
