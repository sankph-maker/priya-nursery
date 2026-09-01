/* Priya Nursery Landing Page Interactive Script */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Header Scroll Effect
       ========================================================================== */
    const header = document.getElementById('main-header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger once on load in case page is refreshed scrolled down


    /* ==========================================================================
       2. Mobile Menu Navigation Toggle
       ========================================================================== */
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const navMenuList = document.getElementById('nav-menu-list');
    const navItems = document.querySelectorAll('.nav-item');

    const toggleMenu = () => {
        menuToggleBtn.classList.toggle('active');
        navMenuList.classList.toggle('active');
    };

    const closeMenu = () => {
        menuToggleBtn.classList.remove('active');
        navMenuList.classList.remove('active');
    };

    menuToggleBtn.addEventListener('click', toggleMenu);
    
    // Close menu when clicking on links
    navItems.forEach(item => {
        item.addEventListener('click', closeMenu);
    });

    // Close menu when clicking outside of nav container
    document.addEventListener('click', (e) => {
        if (!header.contains(e.target) && navMenuList.classList.contains('active')) {
            closeMenu();
        }
    });


    /* ==========================================================================
       3. Active Nav Link on Scroll (Intersection Observer)
       ========================================================================== */
    const sections = document.querySelectorAll('section[id]');
    
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px', // Triggers when section occupies central area
        threshold: 0
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${id}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));


    /* ==========================================================================
       4. Reviews & Testimonials Carousel
       ========================================================================== */
    const track = document.getElementById('carousel-track');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const dotsContainer = document.getElementById('carousel-dots');
    
    let currentIndex = 0;
    const totalCards = cards.length;

    // Create indicator dots dynamically if needed, or link static dots
    const dots = dotsContainer.querySelectorAll('.dot');

    const updateCarousel = (index) => {
        currentIndex = (index + totalCards) % totalCards;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update active dot
        dots.forEach((dot, idx) => {
            if (idx === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    };

    nextBtn.addEventListener('click', () => {
        updateCarousel(currentIndex + 1);
    });

    prevBtn.addEventListener('click', () => {
        updateCarousel(currentIndex - 1);
    });

    // Connect dots to slides
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            updateCarousel(index);
        });
    });

    // Optional Auto Play
    let autoPlayInterval = setInterval(() => {
        updateCarousel(currentIndex + 1);
    }, 6000);

    const resetAutoPlay = () => {
        clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(() => {
            updateCarousel(currentIndex + 1);
        }, 6000);
    };

    // Pause autoplay on interaction
    [prevBtn, nextBtn].forEach(btn => btn.addEventListener('click', resetAutoPlay));
    dots.forEach(dot => dot.addEventListener('click', resetAutoPlay));


    /* ==========================================================================
       5. Interactive Plant Finder Quiz
       ========================================================================== */
    // Plant recommendations database
    const plantDatabase = [
        {
            name: "Alphonso Mango Graft (Hapus)",
            category: "Premium Fruit Sapling",
            description: "Our certified Hapus mango grafts are propagated using high-yield mother plants in Dapoli. They are perfectly acclimated to coastal soil conditions and produce large, sweet, fiberless fruit in 3-4 years.",
            image: "assets/mango.jpg",
            sun: "Full Sun (6+ hours)",
            water: "Moderate (Twice a week when young)",
            suitability: "Orchards / Spacious Backyards / Farmhouses",
            filter: { location: "outdoor", goal: "fruits", maintenance: "medium" }
        },
        {
            name: "Dapoli Cashew Graft (Vengurla-4)",
            category: "Resilient Cash Crop",
            description: "An outstanding cashew graft variety that flourishes in red gravelly/laterite soils. Extremely drought-resistant after establishment, requiring very low watering, making it ideal for standard Konkan farmlands.",
            image: "assets/mango.jpg",
            sun: "Full Sun",
            water: "Low (Once a week)",
            suitability: "Hilly soils / Commercial Farms",
            filter: { location: "outdoor", goal: "fruits", maintenance: "low" }
        },
        {
            name: "Vibrant Red Hibiscus (Jaswand)",
            category: "Exotic Ornamental Shrub",
            description: "A highly resilient native flowering plant that gives striking red blooms throughout the year. Loves full sunlight on terraces or open gardens and benefits from simple, daily watering.",
            image: "assets/hibiscus.jpg",
            sun: "Full Sun / Bright Balcony",
            water: "Moderate (Daily in summers)",
            suitability: "Terraces / Border Hedges / Outdoor Pots",
            filter: { location: "outdoor", goal: "beauty", maintenance: "medium" }
        },
        {
            name: "Exotic Bougainvillea Vine",
            category: "Low Maintenance Flowering Vine",
            description: "A stunning, dry-tolerant climbing ornamental that produces spectacular sheets of pink, purple, or orange colors. It thrives in high heat and needs minimal watering, making it perfect for busy gardeners.",
            image: "assets/hibiscus.jpg",
            sun: "Full Sun (Loves heat)",
            water: "Low (Only when soil is fully dry)",
            suitability: "Balconies / Trellises / Compounds",
            filter: { location: "outdoor", goal: "beauty", maintenance: "low" }
        },
        {
            name: "Holy Basil (Krishna Tulsi)",
            category: "Aromatherapeutic & Medicinal Herb",
            description: "Highly revered for its Ayurvedic properties. Purifies air and offers medicinal leaves for daily herbal tea. Requires semi-shade or balcony sun and regular daily watering to stay lush.",
            image: "assets/tulsi.jpg",
            sun: "Partial Shade / Morning Sun",
            water: "High (Keep soil damp daily)",
            suitability: "Courtyards / Balconies / Window Sills",
            filter: { location: "balcony", goal: "health", maintenance: "medium" }
        },
        {
            name: "Organic Black Pepper Vine",
            category: "Exotic Konkan Spice Vine",
            description: "Bring the aroma of Konkan spices to your home. Black pepper vine grows beautifully when given partial shade under trees or on balconies. Likes climbing support and moderate care.",
            image: "assets/tulsi.jpg",
            sun: "Partial Shade / Filtered Light",
            water: "Moderate (Keep moist)",
            suitability: "Balcony Trellises / Tree Supports",
            filter: { location: "balcony", goal: "health", maintenance: "low" }
        },
        {
            name: "Resilient Aloe Vera",
            category: "Ayurvedic Succulent",
            description: "The ideal plant for wellness. Fleshy green stalks filled with organic soothing gel. Thrives in indoor rooms with indirect window light and needs watering only once a week.",
            image: "assets/tulsi.jpg",
            sun: "Indirect Sunlight / Bright Indoor",
            water: "Low (Once in 7-10 days)",
            suitability: "Rooms / Offices / Kitchen counters",
            filter: { location: "indoor", goal: "health", maintenance: "low" }
        },
        {
            name: "Premium ZZ Indoor Plant",
            category: "Air-Purifying Green Foil",
            description: "Featuring shiny, wax-like dark green leaves, the ZZ plant is the ultimate indoor companion. Tolerates extremely low light, cleans indoor air, and survives weeks without water.",
            image: "assets/tulsi.jpg",
            sun: "Low Light / Artificial Fluorescent Light",
            water: "Low (Water once a month)",
            suitability: "Bedrooms / Living Rooms / Office Desks",
            filter: { location: "indoor", goal: "beauty", maintenance: "low" }
        }
    ];

    // Quiz Wizard step navigation
    const step1 = document.getElementById('step-1');
    const step2 = document.getElementById('step-2');
    const step3 = document.getElementById('step-3');
    const resultStep = document.getElementById('quiz-result');

    const next1 = document.getElementById('btn-step1-next');
    const prev2 = document.getElementById('btn-step2-prev');
    const next2 = document.getElementById('btn-step2-next');
    const prev3 = document.getElementById('btn-step3-prev');
    const submitQuiz = document.getElementById('btn-quiz-submit');
    const restartQuiz = document.getElementById('btn-quiz-restart');

    const showStep = (currentStep, targetStep) => {
        currentStep.classList.remove('active');
        targetStep.classList.add('active');
    };

    // Navigation triggers
    next1.addEventListener('click', () => showStep(step1, step2));
    prev2.addEventListener('click', () => showStep(step2, step1));
    next2.addEventListener('click', () => showStep(step2, step3));
    prev3.addEventListener('click', () => showStep(step3, step2));

    // Handle Quiz Submission
    submitQuiz.addEventListener('click', () => {
        // Collect answers
        const selectedLocation = document.querySelector('input[name="location"]:checked').value;
        const selectedGoal = document.querySelector('input[name="goal"]:checked').value;
        const selectedMaintenance = document.querySelector('input[name="maintenance"]:checked').value;

        // Score recommendations
        let bestMatch = null;
        let highestScore = 0;

        plantDatabase.forEach(plant => {
            let score = 0;
            if (plant.filter.location === selectedLocation) score += 3;
            if (plant.filter.goal === selectedGoal) score += 3;
            if (plant.filter.maintenance === selectedMaintenance) score += 2;
            
            // Fuzzy match logic fallback:
            // If location matches, it's highly compatible.
            if (plant.filter.location === selectedLocation && plant.filter.goal === selectedGoal) {
                score += 5;
            }

            if (score > highestScore) {
                highestScore = score;
                bestMatch = plant;
            }
        });

        // If no match found, fallback to Alphonso Mango
        if (!bestMatch) {
            bestMatch = plantDatabase[0];
        }

        // Render matching plant in result UI
        document.getElementById('result-plant-img').src = bestMatch.image;
        document.getElementById('result-plant-img').alt = bestMatch.name;
        document.getElementById('result-plant-category').textContent = bestMatch.category;
        document.getElementById('result-plant-name').textContent = bestMatch.name;
        document.getElementById('result-plant-desc').textContent = bestMatch.description;
        document.getElementById('result-sun').textContent = bestMatch.sun;
        document.getElementById('result-water').textContent = bestMatch.water;
        document.getElementById('result-suitability').textContent = bestMatch.suitability;

        // Customise WhatsApp button link
        const whatsappBase = "https://wa.me/917498486833?text=";
        const encodedText = encodeURIComponent(`Hi Priya Nursery, I took your Plant Finder Quiz and was recommended the: *${bestMatch.name}* (${bestMatch.category}). Can you share price and availability details?`);
        document.getElementById('result-whatsapp-btn').href = whatsappBase + encodedText;

        // Show result panel
        showStep(step3, resultStep);
    });

    // Restart Quiz
    restartQuiz.addEventListener('click', () => {
        // Reset radio selections to defaults
        document.querySelector('input[name="location"][value="outdoor"]').checked = true;
        document.querySelector('input[name="goal"][value="fruits"]').checked = true;
        document.querySelector('input[name="maintenance"][value="low"]').checked = true;
        
        // Go back to step 1
        showStep(resultStep, step1);
    });


    /* ==========================================================================
       6. Contact Form Validation & Submission
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('form-success-msg');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Retrieve form fields
        const name = document.getElementById('form-name').value.trim();
        const phone = document.getElementById('form-phone').value.trim();
        const email = document.getElementById('form-email').value.trim();
        const interest = document.getElementById('form-interest').value;
        const message = document.getElementById('form-message').value.trim();

        if (name === "" || phone === "" || interest === "") {
            alert("Please fill out all required fields marked with *");
            return;
        }

        // Form submission simulation
        // In actual production, this can send to a PHP endpoint or form backend (Formspree/Web3Forms)
        console.log("Enquiry Form Submitted:", { name, phone, email, interest, message });

        // Hide form and show success message with smooth fade in
        contactForm.classList.add('hidden');
        successMessage.classList.remove('hidden');

        // Optional: Open a WhatsApp window with form details automatically for immediate conversion
        setTimeout(() => {
            const waText = encodeURIComponent(`Hi Priya Nursery, I sent an enquiry:\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Interest:* ${interest}\n*Message:* ${message}`);
            window.open(`https://wa.me/917498486833?text=${waText}`, '_blank');
        }, 1200);
    });


    /* ==========================================================================
       7. Interactive Searchable Plant Catalog
       ========================================================================== */
    const plantCatalog = [
        // 1. FRUIT PLANTS
        { name: "Mango (आंबा)", category: "fruits", varieties: ["Hapus (Alphonso)", "Keshar", "Payri", "Ratna", "Rajapuri", "Totapuri", "Mallika", "Croton", "Dashari", "Vastra", "All Time Mango", "Suvarnarekha", "Aamrapali", "Badami", "Konkan Samrat", "Bajrang", "Dudhpedha", "Sindhu", "Vanraj", "Langda", "Goa Mankur", "Karel", "Chousa", "Khobra Aamba"], desc: "Government-certified premium quality grafted mango saplings." },
        { name: "Cashew (काजू)", category: "fruits", varieties: ["Vengurla-4", "Vengurla-7"], desc: "High-yield Konkan specialty cashew grafts." },
        { name: "Coconut (नारळ)", category: "fruits", varieties: ["Banavali", "TxD", "Lotan", "Green Dwarf", "Orange Dwarf", "Lakshdweep", "Pratap"], desc: "Resilient dwarf and hybrid coconut cultivars." },
        { name: "Supari (सुपारी - Areca Nut)", category: "fruits", varieties: ["Shrivardhan", "Mangala"], desc: "Premium local and high-yielding supari saplings." },
        { name: "Aavla (आवळा)", category: "fruits", varieties: ["NA 7", "Kanchan"], desc: "Vitamin C-rich healthy amla cultivars." },
        { name: "Limbu (लिंबू - Lemon)", category: "fruits", varieties: ["Kagdi", "Seedless", "Konkan Lemon"], desc: "Juicy local sour lime varieties." },
        { name: "Jackfruit (फणस)", category: "fruits", varieties: ["Kapa", "Gumless", "Konkan Prolific", "Red", "Pink", "Vietnam Superearly", "Bangalore Kapa", "Nir Fanas"], desc: "Resilient jackfruit grafts, including exotic red/pink flesh." },
        { name: "Starfruit (करमळ)", category: "fruits", varieties: ["Arkin"], desc: "Sweet starfruit variety with high yielding potential." },
        { name: "Kokam (कोकम)", category: "fruits", varieties: ["Konkan Amruta", "Konkan Hatis"], desc: "Native Konkan souring agent fruit saplings." },
        { name: "Jaam (जाम - Rose Apple)", category: "fruits", varieties: ["White", "Pink", "Green"], desc: "Sweet rose apple cultivars." },
        { name: "Peru (पेरू - Guava)", category: "fruits", varieties: ["1KG Peru", "Sardar (L-49)", "Black Peru", "Pink Peru"], desc: "Premium sweet guava grafts." },
        { name: "Chiku (चिकू)", category: "fruits", varieties: ["Kalipatti", "Cricket Ball"], desc: "Sweet, pulpy sapodilla grafts." },
        { name: "Jambhul (जांभूळ)", category: "fruits", varieties: ["Konkan Bahadoli", "White Jambhul"], desc: "Certified black plum grafts." },
        { name: "Ramfal (रामफळ)", category: "fruits", varieties: ["Soursop (लक्ष्मणफळ)"], desc: "Nutrient-packed custard apple family grafts." },
        { name: "Sitafal (सीताफळ)", category: "fruits", varieties: ["Balanagar", "Golden Sitafal"], desc: "Sweet custard apple saplings." },
        { name: "Avocado (बटर फ्रूट)", category: "fruits", varieties: ["Grafted Avocado", "Seedling Avocado"], desc: "Nutrient-dense avocado saplings." },
        { name: "Santra (संत्रे - Orange)", category: "fruits", varieties: ["Nagpur Orange"], desc: "Nagpur specialty sweet orange grafts." },
        { name: "Mosambi (मोसंबी)", category: "fruits", varieties: ["New Selar"], desc: "Juicy sweet lime saplings." },
        { name: "Tuti (तुती - Mulberry)", category: "fruits", varieties: ["S-13"], desc: "Mulberry saplings for quick growth." },
        { name: "Cherry (चेरी)", category: "fruits", varieties: ["Bing"], desc: "Bing variety sweet cherry saplings." },
        { name: "Rambutan (रामबुतान)", category: "fruits", varieties: ["N-18"], desc: "High-demand exotic rambutan grafts." },
        { name: "Lichi (लिची)", category: "fruits", varieties: ["Rose Scented"], desc: "Fragrant sweet litchi saplings." },
        { name: "Chinch (चिंच - Tamarind)", category: "fruits", varieties: ["Sweet Chinch", "PKM-1"], desc: "Large tamarind and sweet tamarind grafts." },
        { name: "Raiaavla (रायआवळा)", category: "fruits", varieties: [], desc: "Acidic small star gooseberry saplings." },
        { name: "Banana (केळी)", category: "fruits", varieties: ["G-9 Grand Naine"], desc: "Tissue culture high-yield banana saplings." },
        { name: "Nilambi (निळंबी)", category: "fruits", varieties: [], desc: "Local specialty tropical fruit saplings." },
        { name: "Papnus (पपनस - Pomelo)", category: "fruits", varieties: ["Kambili Naranga"], desc: "Large pink-fleshed citrus pomelo grafts." },
        { name: "Mangosteen (मॅन्गोस्टिन)", category: "fruits", varieties: [], desc: "Exotic tropical queen of fruits saplings." },
        { name: "Karvand (करवंद)", category: "fruits", varieties: ["Konkan Bold"], desc: "Large-fruited native Konkan black karvanda." },
        { name: "Shevga (शेवगा - Drumstick)", category: "fruits", varieties: ["Konkan Ruchira", "PKM Drumstick"], desc: "Fast-growing, high-yield drumstick saplings." },
        { name: "Papaya (पपई)", category: "fruits", varieties: ["Hybrid F1 786 Red Lady"], desc: "Premium dwarf red papaya saplings." },
        { name: "Coffee (कॉफी)", category: "fruits", varieties: [], desc: "Adaptable local coffee shrub saplings." },

        // 2. SPICE PLANTS
        { name: "Jayfal (जायफळ - Nutmeg)", category: "spices", varieties: ["Konkan Sugandha"], desc: "Aromatic nutmeg grafts with high essential oil." },
        { name: "Allspice (सर्वमसाला)", category: "spices", varieties: ["Four In One Allspice"], desc: "Clove, cinnamon, nutmeg, and cardamom combined aroma." },
        { name: "Dalchini (दालचिनी - Cinnamon)", category: "spices", varieties: ["Konkan Tej"], desc: "Premium bark-yielding cinnamon saplings." },
        { name: "Tejpatta (तेजपत्ता - Bay Leaf)", category: "spices", varieties: [], desc: "Fragrant bay leaves for cooking." },
        { name: "Lavang (लवंग - Clove)", category: "spices", varieties: ["Penang Clove"], desc: "Strong aroma Penang clove grafts." },
        { name: "Kalimiri (काळीमिरी - Black Pepper)", category: "spices", varieties: ["Panniyur-1 Pepper", "Bush Pepper"], desc: "Spicy climbing and potted pepper varieties." },
        { name: "Velchi (वेलची - Cardamom)", category: "spices", varieties: ["DNA-1 Cardamom"], desc: "High-yield green cardamom saplings." },
        { name: "Halad (हळद - Turmeric)", category: "spices", varieties: [], desc: "High curcumin value turmeric rhizomes." },
        { name: "Kadipatta (कढीपत्ता - Curry Leaf)", category: "spices", varieties: [], desc: "Fragrant essential culinary curry leaf plants." },

        // Explicit Category Plants (with Custom varieties, no images)
        { name: "Jaswand (जास्वंद - Hibiscus)", category: "flowering", varieties: ["Red", "Pink", "Yellow", "White", "Double Red"], desc: "Beautiful tropical flowering shrub with vibrant multi-colored blooms." },
        { name: "Monstera / Houseplants (मॉन्स्टेरा)", category: "indoor", varieties: ["Deliciosa", "Broken Heart"], desc: "Premium split-leaf tropical foliage perfect for low-light statement indoor spaces." }
    ];

    // Helper mapping for remaining categories (excluding items explicitly defined above)
    const palmsList = ["Areca Palm", "Areca Red Palm", "Fox Tail Palm", "Bottle Palm", "Raphis Palm", "Fan Palm", "Bismarkia Palm"];
    const floweringList = ["Mogra", "Tagar", "Mini Tagar", "Melastoma", "Bougainvillea", "Ixora", "Mini Ixora", "Sonchafa", "White Chafa", "Rose", "Mini Rose", "Alamenda", "Kunda", "Kardal", "Lantena", "Kanher", "Aboli", "Raitiya", "Musanda", "Jai", "Jui", "Krushna Kamal", "Lili", "Ananta", "Ratrani", "Himelia", "Parijatak", "Aster", "Pitonia", "Salvia", "Balsome", "Orchid", "Kupia", "Euforbia", "Sayli", "Gladiolus", "Clorodendrum", "Lemonia", "Bakul", "Hirwa Chafa", "Sita Ashok", "Ranjai", "Kalanchoe", "Bitti", "Jatropha", "Tikoma", "Kamini", "Kavti Chafa", "Dev Chafa", "Pentas", "Sontakka", "Gokarna", "Madhumalti"];
    const indoorList = ["Money plant", "Rubber plant", "Fiddle leaf fig", "Alocasia", "Aglonema", "Jade", "Anthurium", "Peace Lily", "Singonium", "Maranta", "Diffenbachia", "Poinsettia", "Redmacher", "Cactus", "Philodendron", "Snake plant", "Ribbon grass", "Fern", "Spider plant", "Pepromia", "Calanthia", "Fittronia", "Bird of paradise", "Broken heart", "Serrisa", "Asperagus"];
    const hedgeList = ["Acalipha", "Bamboo Grass", "Box wood", "Kupia", "Duranta", "Lantena", "Malpighia", "Phylunthus", "Boat lily", "Serrisa", "Pendanus", "Golden papua", "Jatropha"];
    const creepersList = ["Bigonia", "Madhumalti", "Lasun Vel", "Krushna kamal", "Gokrna", "Passion fruit", "Icecream Vel", "Badak vel", "Sankrant vel", "Thubergia"];
    const avenueList = ["Ashoka", "Badam", "Bahava", "Bakul", "Bitti", "Bottle brush", "Buch", "Kadamba", "Kailashpati", "Kanchan", "Muchkund", "Neelmohar", "Peltophorum", "Rain tree", "Samudra fal", "Sitaranjan", "Savar", "Shendari", "Gulmohar", "Silver Oak", "Spathodia", "Surangi", "Suru", "Tabubia", "Sita ashok", "Cycus", "Xmas tree", "Sheesham", "Kashid", "Karanj", "Palas", "Behda", "Neem", "Pimpal", "Tamhan"];
    const medicinalList = ["Adulsa", "Sarpagandha", "Aloe vera", "Hadsandhi", "Kavath", "Bibba", "Kadulimb", "Arjun", "Tulas", "Kapur", "Dhup", "Bramhi", "Gavti chaha", "Pudina", "Aawla", "Ashvagandha", "Erand", "Shatavari"];

    palmsList.forEach(name => plantCatalog.push({ name, category: "palms", varieties: [], desc: "Elegant palm variety perfect for landscaping." }));
    floweringList.forEach(name => plantCatalog.push({ name, category: "flowering", varieties: [], desc: "Beautiful and fragrant flowering plant variety." }));
    indoorList.forEach(name => plantCatalog.push({ name, category: "indoor", varieties: [], desc: "Resilient foliage perfect for home and office decoration." }));
    hedgeList.forEach(name => plantCatalog.push({ name, category: "hedge", varieties: [], desc: "Perfect foliage plant for natural fences and border hedges." }));
    creepersList.forEach(name => plantCatalog.push({ name, category: "creepers", varieties: [], desc: "Vigorous tropical climbing vine/creeper." }));
    avenueList.forEach(name => plantCatalog.push({ name, category: "avenue", varieties: [], desc: "Stately shade or flowering tree suitable for roads and open gardens." }));
    medicinalList.forEach(name => plantCatalog.push({ name, category: "medicinal", varieties: [], desc: "Traditional Ayurvedic herb with active health benefits." }));

    // DOM Elements for Catalog
    const catalogGrid = document.getElementById('catalog-grid');
    const catalogSearch = document.getElementById('catalog-search');
    const catalogFiltersContainer = document.getElementById('catalog-filters');
    const catalogNoResults = document.getElementById('catalog-no-results');

    let activeFilter = 'all';
    let searchQuery = '';

    // Render Function
    const renderCatalog = () => {
        if (!catalogGrid) return;
        catalogGrid.innerHTML = '';
        
        // Filter plant list
        const filteredPlants = plantCatalog.filter(plant => {
            const matchesCategory = (activeFilter === 'all' || plant.category === activeFilter);
            
            const lowerSearch = searchQuery.toLowerCase();
            const matchesSearch = (
                plant.name.toLowerCase().includes(lowerSearch) ||
                plant.desc.toLowerCase().includes(lowerSearch) ||
                (plant.varieties && plant.varieties.some(v => v.toLowerCase().includes(lowerSearch)))
            );
            
            return matchesCategory && matchesSearch;
        });

        if (filteredPlants.length === 0) {
            catalogGrid.classList.add('hidden');
            catalogNoResults.classList.remove('hidden');
            return;
        }

        catalogGrid.classList.remove('hidden');
        catalogNoResults.classList.add('hidden');

        filteredPlants.forEach((plant, index) => {
            const card = document.createElement('div');
            card.className = 'plant-card card-hover-effect';
            
            // Format category label
            const categoryLabels = {
                fruits: 'Fruit Plant',
                spices: 'Spice Plant',
                palms: 'Palm',
                flowering: 'Flowering Plant',
                indoor: 'Indoor Plant',
                hedge: 'Edge & Hedge',
                creepers: 'Creeper / Climber',
                avenue: 'Avenue Plant',
                medicinal: 'Medicinal Plant'
            };
            const label = categoryLabels[plant.category] || 'Plant';

            // Generate varieties block if present
            let varietiesBlock = '';
            if (plant.varieties && plant.varieties.length > 0) {
                const options = plant.varieties.map(v => `<option value="${v}">${v}</option>`).join('');
                varietiesBlock = `
                    <div class="card-varieties">
                        <span class="varieties-count">${plant.varieties.length} Varieties Available</span>
                        <select class="variety-select" id="select-variety-${index}">
                            <option value="">-- Choose Variety --</option>
                            ${options}
                        </select>
                    </div>
                `;
            }

            // Simple description or fallback
            const plantDesc = plant.desc || "Healthy and locally adapted sapling.";

            card.innerHTML = `
                <div class="plant-card-header">
                    <span class="plant-category-badge badge-${plant.category}">${label}</span>
                </div>
                <div class="plant-card-body">
                    <h3>${plant.name}</h3>
                    <p class="plant-card-desc">${plantDesc}</p>
                    ${varietiesBlock}
                    <button class="btn btn-primary btn-inquire btn-full" data-index="${index}">
                        <svg class="icon-small" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="currentColor"/></svg>
                        Inquire Price
                    </button>
                </div>
            `;

            // Attach event listener to inquire button
            const btn = card.querySelector('.btn-inquire');
            btn.addEventListener('click', () => {
                let varietyText = "";
                if (plant.varieties && plant.varieties.length > 0) {
                    const select = card.querySelector('.variety-select');
                    if (select && select.value) {
                        varietyText = ` (*Variety:* ${select.value})`;
                    }
                }
                const waText = encodeURIComponent(`Hi Priya Nursery, I am interested in inquiring about the pricing and availability of: *${plant.name}*${varietyText} from your online catalog.`);
                window.open(`https://wa.me/917498486833?text=${waText}`, '_blank');
            });

            catalogGrid.appendChild(card);
        });
    };

    // Event listeners
    if (catalogSearch) {
        catalogSearch.addEventListener('input', (e) => {
            searchQuery = e.target.value.trim();
            renderCatalog();
        });
    }

    if (catalogFiltersContainer) {
        const filterButtons = catalogFiltersContainer.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                activeFilter = btn.getAttribute('data-filter');
                renderCatalog();
            });
        });
    }

    // Initial render call
    if (catalogGrid) {
        renderCatalog();
    }
});
