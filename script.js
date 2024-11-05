document.getElementById('calculate-btn').addEventListener('click', function() {
    // Tracking de l'événement
    gtag('event', 'custom_calculate_click', {
        'event_category': 'Button',
        'event_label': 'calculateButton',
        'value': 1
    });
})
document.getElementById('calculator').addEventListener('submit', function(e) {
    e.preventDefault();
    // Récupérer les valeurs des entrées
    const mlVape = parseFloat(document.getElementById('mlVape').value);
    const nicotine = parseFloat(document.getElementById('nicotine').value);
    const brand = parseFloat(document.getElementById('brand').value); // mg/cig
    const temps = parseFloat(document.getElementById('temps').value); // Optionnel
    const absorption = parseFloat(document.getElementById('absorption').value) / 100; // Convertir en facteur

    // Constantes
    const cigarettesParPaquet = 20;

    // Validation des entrées
    if (isNaN(mlVape) || mlVape <= 0) {
        alert("Veuillez entrer une quantité vapeée valide (ml > 0).");
        return;
    }

    if (isNaN(nicotine) || nicotine <= 0) {
        alert("Veuillez entrer un taux de nicotine valide (mg/ml > 0).");
        return;
    }

    if (isNaN(absorption) || absorption < 0 || absorption > 1) {
        alert("Veuillez entrer un facteur d'absorption valide (0% - 100%).");
        return;
    }

    if (!isNaN(temps) && temps <= 0) {
        alert("Veuillez entrer un temps valide en semaines (semaines > 0) ou laissez le champ vide.");
        return;
    }

    // Calcul de la nicotine totale consommée ajustée par le facteur d'absorption
    const nicotineTotale = mlVape * nicotine * absorption; // en mg

    // Calcul de l'équivalent en cigarettes
    const equivalentCigarettes = nicotineTotale / brand;

    // Calcul de l'équivalent en paquets
    const equivalentPaquets = equivalentCigarettes / cigarettesParPaquet;

    // Calcul des cigarettes consommées par semaine et par jour
    let cigarettesPerWeek = null;
    let cigarettesPerDay = null;

    if (!isNaN(temps) && temps > 0) {
        cigarettesPerWeek = equivalentCigarettes / temps;
        cigarettesPerDay = cigarettesPerWeek / 7;
    }

    // Afficher les résultats
    let resultText = `
        Nicotine totale consommée : ${nicotineTotale.toFixed(2)} mg<br>
        Équivalent en cigarettes : ${equivalentCigarettes.toFixed(2)} cigarettes<br>
        Équivalent en paquets : ${equivalentPaquets.toFixed(2)} paquets
    `;

    // Ajouter les cigarettes par semaine et par jour si le temps est fourni
    if (cigarettesPerWeek !== null && cigarettesPerDay !== null) {
        resultText += `
            <br>Cigarettes consommées par semaine : ${cigarettesPerWeek.toFixed(2)} cigarettes/semaine
            <br>Cigarettes consommées par jour : ${cigarettesPerDay.toFixed(2)} cigarettes/jour
        `;
    }

    document.getElementById('result').innerHTML = resultText;
});
