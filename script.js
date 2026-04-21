/**
 * PROJET : Portfolio Dynamique GitHub
 * Concepts : Async/Await, Fetch API, Error Handling (Try/Catch/Finally), DOM Manipulation
 */

const colors = {
    JavaScript: "bg-yellow-100 text-yellow-800",
    TypeScript: "bg-blue-100 text-blue-800",
    Python: "bg-blue-100 text-blue-700",
    HTML: "bg-orange-100 text-orange-800",
    CSS: "bg-purple-100 text-purple-800",
    SCSS: "bg-pink-100 text-pink-800",
    Shell: "bg-green-100 text-green-800",
    Bash: "bg-green-100 text-green-800",
    Java: "bg-red-100 text-red-800",
    C: "bg-gray-200 text-gray-800",
    "C++": "bg-indigo-100 text-indigo-800",
    default: "bg-gray-100 text-gray-800"
};


const input = document.querySelector('input');
const button = document.querySelector('button');
const loading = document.getElementById('loading');
const listElement = document.getElementById('projects-list');
const errorElement = document.getElementById('error-message');

/**
 * Fonction principale de récupération des données
 */
async function fetchGitHubProjects(username) {
    try {
        errorElement.textContent = "";
        listElement.innerHTML = "";
        loading.classList.remove('hidden');
        button.disabled = true; // Évite le spam de clics

        // Appel API
        const response = await fetch(`https://api.github.com/users/${username}/repos`);

        // Gestion des erreurs HTTP
        if (!response.ok) {
            if (response.status === 403) throw new Error("API bridée (trop de requêtes). Réessayez plus tard.");
            if (response.status === 404) throw new Error("Utilisateur GitHub introuvable.");
            throw new Error("Erreur lors de la récupération des données.");
        }

        const projects = await response.json();

        // Cas de l'utilisateur sans dépôts
        if (projects.length === 0) {
            errorElement.textContent = "Cet utilisateur n'a aucun dépôt public.";
            return;
        }


        projects.sort((a, b) => b.stargazers_count - a.stargazers_count);


        projects.forEach((project) => {
            const li = document.createElement("li");
            li.className = `p-5 bg-white rounded-2xl border border-gray-200 shadow-sm 
                            hover:shadow-md hover:-translate-y-1 transition duration-200 
                            flex flex-col justify-between h-full`;


            const title = document.createElement("h2");
            title.className = "text-lg font-semibold";
            title.textContent = project.name;

            const desc = document.createElement("p");
            desc.className = "text-gray-500 mt-2 text-sm";
            desc.textContent = project.description || "Aucune description fournie.";


            const info = document.createElement("div");
            info.className = "flex items-center justify-between mt-4 text-sm text-gray-600";

            const language = document.createElement("span");
            language.textContent = project.language || "Inconnu";
            language.className = `px-2 py-1 rounded-full text-xs font-medium ${colors[project.language] || colors.default}`;

            const stars = document.createElement("span");
            stars.textContent = `⭐ ${project.stargazers_count}`;
            stars.className = "font-medium";


            const extra = document.createElement("div");
            extra.className = "flex justify-between text-xs text-gray-400 mt-2";

            const forks = document.createElement("span");
            forks.textContent = `🍴 ${project.forks_count}`;

            const updated = document.createElement("span");
            updated.textContent = `MàJ : ${new Date(project.updated_at).toLocaleDateString()}`;


            const link = document.createElement("a");
            link.href = project.html_url;
            link.target = "_blank";
            link.className = "inline-block mt-3 text-sm font-medium text-blue-600 hover:underline";
            link.textContent = "Voir sur GitHub →";


            extra.append(forks, updated);
            info.append(language, stars);
            li.append(title, desc, info, extra, link);
            listElement.appendChild(li);
        });

    } catch (error) {
        // Affichage de l'erreur dans l'UI
        errorElement.textContent = error.message;
    } finally {
        // Nettoyage final quoi qu'il arrive
        loading.classList.add('hidden');
        button.disabled = false;
    }
}

/**
 * Logique de déclenchement
 */
async function genererPortfolio() {
    const inputValue = input.value.trim();
    if (inputValue !== "") {
        await fetchGitHubProjects(inputValue);
    } else {
        errorElement.textContent = "Veuillez entrer un nom d'utilisateur.";
    }
}

button.addEventListener('click', (event) => {
    event.preventDefault();
    genererPortfolio();
});

input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        genererPortfolio();
    }
});

window.addEventListener('load', () => {
    if(document.querySelector('form')) {
        document.querySelector('form').reset();
    }
});