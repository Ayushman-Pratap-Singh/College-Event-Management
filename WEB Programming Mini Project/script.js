// Event Management System
class EventManager {
    constructor() {
        this.events = JSON.parse(localStorage.getItem('collegeEvents')) || [];
        this.registrations = JSON.parse(localStorage.getItem('eventRegistrations')) || {};
        this.initializeEventListeners();
        this.renderEvents();
        
        // Debug information
        console.log("EventManager initialized");
        console.log("Events loaded:", this.events);
    }

    // Initialize all event listeners
    initializeEventListeners() {
        // Navigation buttons
        const showEventsBtn = document.getElementById('show-events-btn');
        const createEventBtn = document.getElementById('create-event-btn');
        
        showEventsBtn.addEventListener('click', () => {
            console.log("Show events button clicked");
            this.showEventsSection();
        });
        
        createEventBtn.addEventListener('click', () => {
            console.log("Create event button clicked");
            this.showCreateEventSection();
        });

        // Create event form
        const createEventForm = document.getElementById('create-event-form');
        createEventForm.addEventListener('submit', (e) => {
            console.log("Create event form submitted");
            this.handleCreateEvent(e);
        });

        // Event filtering
        document.getElementById('category-filter').addEventListener('change', () => this.filterEvents());
        document.getElementById('date-filter').addEventListener('change', () => this.filterEvents());

        // Registration modal
        this.setupRegistrationModal();
        
        console.log("All event listeners initialized");
    }

    // Show events section
    showEventsSection() {
        document.getElementById('events-section').classList.remove('hidden');
        document.getElementById('create-event-section').classList.add('hidden');
        document.getElementById('filter-section').classList.remove('hidden');
        this.renderEvents();
        console.log("Events section shown, create section hidden");
    }

    // Show create event section
    showCreateEventSection() {
        document.getElementById('events-section').classList.add('hidden');
        document.getElementById('create-event-section').classList.remove('hidden');
        document.getElementById('filter-section').classList.add('hidden');
        console.log("Create section shown, events section hidden");
    }

    // Handle creating a new event
    handleCreateEvent(e) {
        e.preventDefault();
        console.log("Handling event creation");

        // Collect form data
        const eventName = document.getElementById('event-name').value;
        const eventDate = document.getElementById('event-date').value;
        const eventTime = document.getElementById('event-time').value;
        const eventCategory = document.getElementById('event-category').value;
        const eventDescription = document.getElementById('event-description').value;
        const eventLocation = document.getElementById('event-location').value;

        console.log("Form data:", { eventName, eventDate, eventTime, eventCategory, eventDescription, eventLocation });

        // Validate input
        if (!this.validateEventForm(eventName, eventDate, eventTime, eventCategory, eventLocation)) {
            console.log("Form validation failed");
            return;
        }

        // Create event object
        const newEvent = {
            id: Date.now().toString(), // Unique ID
            name: eventName,
            date: eventDate,
            time: eventTime,
            category: eventCategory,
            description: eventDescription,
            location: eventLocation
        };

        console.log("New event created:", newEvent);

        // Add to events array
        this.events.push(newEvent);

        // Save to local storage
        this.saveEventsToLocalStorage();

        // Render updated events
        this.renderEvents();

        // Reset form and switch back to events view
        document.getElementById('create-event-form').reset();
        this.showEventsSection();

        // Show success message
        alert('Event created successfully!');
    }

    // Validate event creation form
    validateEventForm(name, date, time, category, location) {
        if (!name || !date || !time || !category || !location) {
            alert('Please fill in all fields');
            return false;
        }

        // Additional validation can be added here
        const eventDate = new Date(date);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); // Reset time part for date comparison

        if (eventDate < currentDate) {
            alert('Event date must be in the future');
            return false;
        }

        return true;
    }

    // Rest of the class methods remain the same...

    // Render events to the page
    renderEvents(filteredEvents = null) {
        const eventsContainer = document.getElementById('events-container');
        eventsContainer.innerHTML = ''; // Clear existing events

        const eventsToRender = filteredEvents || this.events;
        console.log("Rendering events:", eventsToRender);

        if (eventsToRender.length === 0) {
            eventsContainer.innerHTML = '<p>No events found.</p>';
            return;
        }

        eventsToRender.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.classList.add('event-card');
            
            // Calculate registered participants count
            const registrationCount = this.registrations[event.id] 
                ? this.registrations[event.id].length 
                : 0;

            eventCard.innerHTML = `
                <h3>${event.name}</h3>
                <div class="event-details">
                    <p><strong>Date:</strong> ${event.date}</p>
                    <p><strong>Time:</strong> ${event.time}</p>
                    <p><strong>Category:</strong> ${event.category}</p>
                    <p><strong>Location:</strong> ${event.location}</p>
                    <p><strong>Description:</strong> ${event.description}</p>
                    <p><strong>Registered Participants:</strong> ${registrationCount}</p>
                </div>
                <button class="register-btn" data-event-id="${event.id}">Register</button>
            `;

            // Add event listener for registration
            eventCard.querySelector('.register-btn').addEventListener('click', (e) => {
                this.openRegistrationModal(event);
            });

            eventsContainer.appendChild(eventCard);
        });
    }

    // Filter events based on category and date
    filterEvents() {
        const categoryFilter = document.getElementById('category-filter').value;
        const dateFilter = document.getElementById('date-filter').value;

        console.log("Filtering events by:", { category: categoryFilter, date: dateFilter });

        const filteredEvents = this.events.filter(event => {
            const matchesCategory = !categoryFilter || event.category === categoryFilter;
            const matchesDate = !dateFilter || event.date === dateFilter;
            return matchesCategory && matchesDate;
        });

        this.renderEvents(filteredEvents);
    }

    // Setup registration modal
    setupRegistrationModal() {
        // Close modal functionality
        const modal = document.getElementById('registration-modal');
        const closeModalBtn = document.querySelector('.close-modal');
        
        // Close modal when clicking the 'x' button
        closeModalBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent any default behavior
            this.closeRegistrationModal();
        });

        // Close modal when clicking outside the modal content
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeRegistrationModal();
            }
        });

        // Prevent event propagation inside modal to avoid closing when clicking inside
        const modalContent = document.querySelector('.modal-content');
        modalContent.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // Registration form submission
        const registrationForm = document.getElementById('registration-form');
        registrationForm.addEventListener('submit', (e) => this.handleEventRegistration(e));
    }

    // Open registration modal
    openRegistrationModal(event) {
        const modal = document.getElementById('registration-modal');
        const modalEventName = document.getElementById('modal-event-name');
        const eventIdInput = document.getElementById('registration-event-id');

        // Set event details in modal
        modalEventName.textContent = `Register for ${event.name}`;
        eventIdInput.value = event.id;

        // Show modal
        modal.classList.remove('hidden');
    }

    // Close registration modal
    closeRegistrationModal() {
        const modal = document.getElementById('registration-modal');
        modal.classList.add('hidden');
        
        // Reset the form
        document.getElementById('registration-form').reset();
    }

    // Handle event registration
    handleEventRegistration(e) {
        e.preventDefault();
        console.log("Handling event registration");

        // Collect registration data
        const eventId = document.getElementById('registration-event-id').value;
        const studentName = document.getElementById('student-name').value;
        const studentEmail = document.getElementById('student-email').value;
        const studentDepartment = document.getElementById('student-department').value;

        console.log("Registration data:", { eventId, studentName, studentEmail, studentDepartment });

        // Validate input
        if (!this.validateRegistrationForm(studentName, studentEmail, studentDepartment)) {
            return;
        }

        // Create registration object
        const registration = {
            id: Date.now().toString(),
            name: studentName,
            email: studentEmail,
            department: studentDepartment
        };

        // Add registration to event
        if (!this.registrations[eventId]) {
            this.registrations[eventId] = [];
        }

        // Check if already registered
        const alreadyRegistered = this.registrations[eventId].some(
            reg => reg.email === studentEmail
        );

        if (alreadyRegistered) {
            alert('You have already registered for this event');
            return;
        }

        // Add registration
        this.registrations[eventId].push(registration);

        // Save to local storage
        this.saveRegistrationsToLocalStorage();

        // Render updated events to reflect new registration count
        this.renderEvents();

        // Close modal and show success message
        this.closeRegistrationModal();
        alert('Registration successful!');
    }

    // Validate registration form
    validateRegistrationForm(name, email, department) {
        if (!name || !email || !department) {
            alert('Please fill in all fields');
            return false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return false;
        }

        return true;
    }

    // Save events to local storage
    saveEventsToLocalStorage() {
        localStorage.setItem('collegeEvents', JSON.stringify(this.events));
        console.log("Events saved to localStorage:", this.events);
    }

    // Save registrations to local storage
    saveRegistrationsToLocalStorage() {
        localStorage.setItem('eventRegistrations', JSON.stringify(this.registrations));
        console.log("Registrations saved to localStorage:", this.registrations);
    }
}

// Initialize the Event Manager when the page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded");
    const eventManager = new EventManager();
    
    // Force initial UI state to show events
    eventManager.showEventsSection();
});