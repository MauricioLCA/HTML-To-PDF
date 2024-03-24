window.function = function (html, fileName, format, zoom, orientation, margin, breakBefore, breakAfter, breakAvoid, fidelity, customDimensions) {
    // FIDELITY MAPPING
    const fidelityMap = {
        low: 1,
        standard: 1.5,
        high: 2,
    };

    // DYNAMIC VALUES
    html = html.value ?? "No HTML set.";
    fileName = fileName.value ?? "file.pdf"; // Asegúrate de que el nombre de archivo tenga una extensión .pdf
    format = format.value ?? "letter";
    zoom = parseFloat(zoom.value) ?? 1;
    orientation = orientation.value ?? "portrait";
    margin = margin.value ?? "0";
    breakBefore = breakBefore.value ? breakBefore.value.split(",") : [];
    breakAfter = breakAfter.value ? breakAfter.value.split(",") : [];
    breakAvoid = breakAvoid.value ? breakAvoid.value.split(",") : [];
    quality = fidelityMap[fidelity.value] ?? 1.5;
    customDimensions = customDimensions.value ? customDimensions.value.split(",").map(Number) : null;

    // DOCUMENT DIMENSIONS
    const formatDimensions = {
        // Includes all specified dimensions
    };

    const dimensions = customDimensions || formatDimensions[format];
    const finalDimensions = dimensions.map((dimension) => Math.round(dimension * zoom));

    // CUSTOM CSS FOR DOWNLOAD BUTTON
    const customCSS = `
    body {
        margin: 0!important;
    }
    button#download {
        align-items: center;
        background-color: rgb(35, 193, 218);
        border: none;
        border-radius: 8px;
        box-sizing: border-box;
        color: rgb(255, 255, 255);
        cursor: pointer;
        display: block;
        font-family: Inter, -apple-system, "system-ui", Roboto, sans-serif;
        font-size: 14px;
        font-weight: 600;
        margin: 20px auto;
        padding: 8px 16px;
        width: fit-content;
        text-decoration: none;
    }
    button#download:hover {
        background-color: #1eb6ce;
    }
    `;

    // HTML STRUCTURE WITH DOWNLOAD BUTTON ONLY
    const originalHTML = `
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.min.js"></script>
    <style>${customCSS}</style>
    <button id="download">Download PDF</button>
    <script>
    document.getElementById('download').addEventListener('click', function() {
        var element = document.createElement('div');
        element.innerHTML = ${JSON.stringify(html)};
        var opt = {
            margin: ${margin},
            filename: ${JSON.stringify(fileName)},
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: quality, useCORS: true },
            jsPDF: { unit: 'pt', format: finalDimensions, orientation: '${orientation}' }
        };
        html2pdf().set(opt).from(element).save().then(() => {
            alert('Download Complete!');
        });
    });
    </script>
    `;

    return `data:text/html;charset=utf-8,${encodeURIComponent(originalHTML)}`;
};
