
const enquiryForm = document.getElementById("enquiryForm");
const enquiriesTable = document.getElementById("enquiriesTable");
const formMessage = document.getElementById("formMessage");
const submitButton = document.getElementById("submitButton");
const searchInput = document.getElementById("searchInput");

let allEnquiries = [];

// Safely display text received from the backend
function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entities[character];
    });
}

// Update dashboard statistics
function updateStatistics(enquiries) {
    const totalCount = document.getElementById("totalCount");
    const pendingCount = document.getElementById("pendingCount");
    const highCount = document.getElementById("highCount");
    const completedCount = document.getElementById("completedCount");

    if (totalCount) {
        totalCount.textContent = enquiries.length;
    }

    if (pendingCount) {
        pendingCount.textContent =
            enquiries.filter(item => item.status === "Pending").length;
    }

    if (highCount) {
        highCount.textContent =
            enquiries.filter(item => item.priority === "High").length;
    }

    if (completedCount) {
        completedCount.textContent =
            enquiries.filter(item => item.status === "Completed").length;
    }
}

// Display old SQLite enquiries in the homepage table
function displayEnquiries(enquiries) {

    if (!enquiriesTable) {
        return;
    }

    if (enquiries.length === 0) {
        enquiriesTable.innerHTML = `
            <tr>
                <td colspan="7">No enquiries found.</td>
            </tr>
        `;
        return;
    }

    enquiriesTable.innerHTML = enquiries.map(item => {

        const priorityClass =
            item.priority === "High"
                ? "priority-high"
                : "priority-normal";

        return `
            <tr>
                <td>
                    <strong>${escapeHTML(item.patient_name)}</strong>
                    <br>
                    ${escapeHTML(item.email)}
                </td>

                <td>${escapeHTML(item.message)}</td>

                <td>${escapeHTML(item.category)}</td>

                <td>${escapeHTML(item.department)}</td>

                <td>
                    <span class="${priorityClass}">
                        ${escapeHTML(item.priority)}
                    </span>
                </td>

                <td>
                    <div class="reply-text">
                        ${escapeHTML(item.ai_reply)}
                    </div>
                </td>

                <td>
                    <select
                        class="status-select"
                        data-id="${Number(item.id)}"
                        aria-label="Update enquiry status"
                    >
                        <option value="Pending"
                            ${item.status === "Pending" ? "selected" : ""}>
                            Pending
                        </option>

                        <option value="Reviewed"
                            ${item.status === "Reviewed" ? "selected" : ""}>
                            Reviewed
                        </option>

                        <option value="Completed"
                            ${item.status === "Completed" ? "selected" : ""}>
                            Completed
                        </option>
                    </select>
                </td>
            </tr>
        `;

    }).join("");
}

// Load old SQLite enquiries
async function loadEnquiries() {

    if (!enquiriesTable) {
        return;
    }

    try {

        const response = await fetch("/api/enquiries");

        if (!response.ok) {
            throw new Error("Unable to load enquiries.");
        }

        allEnquiries = await response.json();

        updateStatistics(allEnquiries);
        displayEnquiries(allEnquiries);

    } catch (error) {

        console.error("Enquiry loading error:", error);

        enquiriesTable.innerHTML = `
            <tr>
                <td colspan="7">
                    Unable to load enquiries. Please refresh the page.
                </td>
            </tr>
        `;
    }
}

// Homepage enquiry form
// New enquiries must be submitted after patient login
if (enquiryForm) {

    enquiryForm.addEventListener("submit", function(event) {

        event.preventDefault();

        if (formMessage) {
            formMessage.textContent =
                "Please log in as a patient to submit your enquiry.";
            formMessage.style.color = "#2563eb";
        }

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Redirecting to Patient Login...";
        }

        setTimeout(() => {
            window.location.href = "/patient/login";
        }, 1000);

    });
}

// Update old SQLite enquiry status
if (enquiriesTable) {

    enquiriesTable.addEventListener("change", async function(event) {

        if (!event.target.classList.contains("status-select")) {
            return;
        }

        const enquiryId = event.target.dataset.id;
        const newStatus = event.target.value;

        try {

            const response = await fetch(
                `/api/enquiries/${enquiryId}/status`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        status: newStatus
                    })
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.error || "Status update failed."
                );
            }

            await loadEnquiries();

        } catch (error) {

            alert(error.message);
            await loadEnquiries();
        }
    });
}

// Search enquiries
if (searchInput) {

    searchInput.addEventListener("input", function() {

        const searchTerm =
            searchInput.value.toLowerCase().trim();

        const filteredEnquiries = allEnquiries.filter(item => {

            return [
                item.patient_name,
                item.email,
                item.message,
                item.category,
                item.department,
                item.priority,
                item.status
            ].some(value =>
                String(value ?? "")
                    .toLowerCase()
                    .includes(searchTerm)
            );
        });

        displayEnquiries(filteredEnquiries);
    });
}

// Load existing homepage data
loadEnquiries();
