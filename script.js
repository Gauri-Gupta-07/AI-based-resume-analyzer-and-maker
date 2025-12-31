document.getElementById("generateResume").addEventListener("click", function() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let skills = document.getElementById("skills").value;
    let experience = document.getElementById("experience").value;

    document.getElementById("previewName").innerText = name;
    document.getElementById("previewEmail").innerText = email;
    document.getElementById("previewSkills").innerText = skills;
    document.getElementById("previewExperience").innerText = experience;

    document.getElementById("resumePreview").style.display = "block";

    // Send data to backend
    fetch("http://localhost:5000", {
        method: "POST",
        body: JSON.stringify({ name, email, skills, experience })
    })
    .then(response => response.text())
    .then(data => console.log("Backend Response:", data))
    .catch(error => console.error("Error:", error));
});

// PDF Generation using jsPDF
document.getElementById("downloadPDF").addEventListener("click", function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Resume", 80, 20);

    doc.setFontSize(12);
    doc.text(`Name: ${document.getElementById("previewName").innerText}`, 20, 40);
    doc.text(`Email: ${document.getElementById("previewEmail").innerText}`, 20, 50);
    doc.text(`Skills: ${document.getElementById("previewSkills").innerText}`, 20, 60);
    doc.text(`Experience: ${document.getElementById("previewExperience").innerText} years`, 20, 70);

    doc.save("Resume.pdf");
});
