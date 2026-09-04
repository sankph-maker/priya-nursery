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
        const resImg = document.getElementById('result-plant-img');
        resImg.src = bestMatch.image;
        resImg.onerror = function() {
            if (this.src.includes('assets/')) {
                this.src = this.src.replace('assets/', '');
            } else {
                this.onerror = null;
                this.src = 'real_nursery_1.jpg';
            }
        };
        resImg.alt = bestMatch.name;
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
       7. Enriched Plant Catalog & Category System
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
        { name: "Shevga (शेvगा - Drumstick)", category: "fruits", varieties: ["Konkan Ruchira", "PKM Drumstick"], desc: "Fast-growing, high-yield drumstick saplings." },
        { name: "Papaya (पपई)", category: "fruits", varieties: ["Hybrid F1 786 Red Lady"], desc: "Premium dwarf red papaya saplings." },
        { name: "Coffee (कॉफी)", category: "fruits", varieties: [], desc: "Adaptable local coffee shrub saplings." },
        
        // 2. SPICE PLANTS
        { name: "Jayfal (जायफळ - Nutmeg)", category: "spices", varieties: ["Konkan Sugandha"], desc: "Aromatic nutmeg grafts with high essential oil." },
        { name: "Dalchini (दालचिनी - Cinnamon)", category: "spices", varieties: ["Konkan Tej"], desc: "Premium bark-yielding cinnamon saplings." },
        { name: "Lavang (लवंग - Clove)", category: "spices", varieties: ["Penang Clove"], desc: "Strong aroma Penang clove grafts." },
        { name: "Kalimiri (काळीमिरी - Black Pepper)", category: "spices", varieties: ["Panniyur-1 Pepper", "Bush Pepper"], desc: "Spicy climbing and potted pepper varieties." },
        { name: "Allspice (सर्वमसाला)", category: "spices", varieties: ["Four In One Allspice"], desc: "Clove, cinnamon, nutmeg, and cardamom combined aroma." },
        { name: "Tejpatta (तेजपत्ता - Bay Leaf)", category: "spices", varieties: [], desc: "Fragrant bay leaves for cooking." },
        { name: "Velchi (वेलची - Cardamom)", category: "spices", varieties: ["DNA-1 Cardamom"], desc: "High-yield green cardamom saplings." },
        { name: "Halad (हळद - Turmeric)", category: "spices", varieties: [], desc: "High curcumin value turmeric rhizomes." },
        { name: "Kadipatta (कढीपत्ता - Curry Leaf)", category: "spices", varieties: [], desc: "Fragrant essential culinary curry leaf plants." },
        
        // Explicit Category Plants (with Custom varieties, no images)
        { name: "Jaswand (जास्वंद - Hibiscus)", category: "flowering", varieties: ["Red", "Pink", "Yellow", "White", "Double Red"], desc: "Beautiful tropical flowering shrub with vibrant multi-colored blooms." },
        { name: "Monstera / Houseplants (मॉन्स्टेरा)", category: "indoor", varieties: ["Deliciosa", "Broken Heart"], desc: "Premium split-leaf tropical foliage perfect for low-light statement indoor spaces." }
    ];

    const palmsList = ["Areca Palm", "Areca Red Palm / Red Sealing Wax Palm", "Fox Tail Palm", "Bottle Palm", "Raphis Palm / Lady Palm", "Fan Palm / Chinese Fan Palm", "Bismarkia Palm / Silver Bismarck"];
    const floweringList = ["Mogra", "Sonchafa", "Rose", "Tagar", "Mini Tagar", "Melastoma", "Bougainvillea", "Ixora", "Mini Ixora", "White Chafa", "Mini Rose", "Alamenda", "Kunda", "Kardal", "Lantena", "Kanher", "Aboli", "Raitiya", "Musanda", "Jai", "Jui", "Krushna Kamal", "Lili", "Ananta", "Ratrani", "Himelia", "Parijatak", "Aster", "Pitonia", "Salvia", "Balsome", "Orchid", "Kupia", "Euforbia", "Sayli", "Gladiolus", "Clorodendrum", "Lemonia", "Bakul", "Hirwa Chafa", "Sita Ashok", "Ranjai", "Kalanchoe", "Bitti", "Jatropha", "Tikoma", "Kamini", "Kavti Chafa", "Dev Chafa", "Pentas", "Sontakka", "Gokarna", "Madhumalti"];
    const indoorList = ["Money Plant / Golden Pothos", "Peace Lily", "Snake Plant", "Rubber Plant", "Fiddle Leaf Fig", "Alocasia / African Mask", "Aglonema / Chinese Evergreen", "Jade Plant", "Anthurium / Flamingo Flower", "Singonium / Arrowhead Plant", "Maranta / Prayer Plant", "Diffenbachia / Dumb Cane", "Poinsettia", "Redmacher / China Doll Plant", "Cactus Arrangement", "Philodendron Birkin", "Ribbon Grass", "Boston Fern", "Spider Plant", "Pepromia / Baby Rubber Plant", "Calanthia / Peacock Plant", "Fittronia / Nerve Plant", "Bird of Paradise", "Broken Heart / Swiss Cheese Vine", "Serrisa / Snowrose Bonsai", "Asparagus Fern"];
    const hedgeList = ["Acalipha / Copperleaf", "Duranta / Golden Dewdrop", "Bamboo Grass", "Box wood / Boxwood", "Kupia / False Heather", "Lantena / Lantana Hedge", "Malpighia / Singapore Holly", "Phylunthus / Snow Bush", "Boat Lily / Moses-in-the-Cradle", "Serrisa / Snowrose Hedge", "Pendanus / Screw Pine", "Golden Papua / Golden Aralia", "Jatropha Hedge / Peregrina"];
    const creepersList = ["Madhumalti / Rangoon Creeper", "Gokarna / Blue Butterfly Pea Vine", "Bigonia / Flame Vine", "Lasun Vel / Garlic Vine", "Krushna Kamal / Passion Flower Vine", "Passion Fruit Vine", "Icecream Vel / Pink Mandevilla", "Badak Vel / Dutchman's Pipe", "Sankrant Vel / Orange Flame Vine", "Thubergia / Blue Sky Vine"];
    const avenueList = ["Ashoka Tree", "Gulmohar / Royal Poinciana", "Badam / Indian Almond", "Bahava / Golden Shower Tree", "Bakul / Spanish Cherry", "Bitti / Yellow Oleander", "Bottle Brush", "Buch / Indian Cork Tree", "Kadamba", "Kailashpati / Cannonball Tree", "Kanchan / Orchid Tree", "Muchkund / Dinner Plate Tree", "Neelmohar / Blue Jacaranda", "Peltophorum / Yellow Flame Tree", "Rain Tree", "Silver Oak", "Spathodia / African Tulip Tree", "Samudra Fal / Sea Poison Tree", "Sitaranjan / Mast Tree", "Savar / Red Silk Cotton Tree", "Shendari / Kamala Tree", "Surangi", "Suru / Whistling Pine", "Tabubia / Pink Trumpet Tree", "Sita Ashok", "Cycus / Sago Palm", "Xmas Tree / Norfolk Island Pine", "Sheesham / Indian Rosewood", "Kashid / Siamese Cassia", "Karanj / Pongamia Tree", "Palas / Flame of the Forest", "Behda / Baheda Tree", "Neem / Margosa Tree", "Pimpal / Sacred Fig", "Tamhan / Pride of India"];
    const medicinalList = ["Tulas", "Adulsa", "Aloe vera", "Sarpagandha", "Hadsandhi", "Kavath", "Bibba", "Kadulimb", "Arjun", "Giloy", "Kapur", "Dhup", "Bramhi", "Gavti chaha", "Pudina", "Aawla", "Ashvagandha", "Erand", "Shatavari"];

    palmsList.forEach(name => plantCatalog.push({ name, category: "palms", varieties: [], desc: "Elegant palm variety perfect for landscaping." }));
    floweringList.forEach(name => plantCatalog.push({ name, category: "flowering", varieties: [], desc: "Beautiful and fragrant flowering plant variety." }));
    indoorList.forEach(name => plantCatalog.push({ name, category: "indoor", varieties: [], desc: "Resilient foliage perfect for home and office decoration." }));
    hedgeList.forEach(name => plantCatalog.push({ name, category: "hedge", varieties: [], desc: "Perfect foliage plant for natural fences and border hedges." }));
    creepersList.forEach(name => plantCatalog.push({ name, category: "creepers", varieties: [], desc: "Vigorous tropical climbing vine/creeper." }));
    avenueList.forEach(name => plantCatalog.push({ name, category: "avenue", varieties: [], desc: "Stately shade or flowering tree suitable for roads and open gardens." }));
    medicinalList.forEach(name => plantCatalog.push({ name, category: "medicinal", varieties: [], desc: "Traditional Ayurvedic herb with active health benefits." }));

    // Category Metadata
    const categories = {
        fruits: {
            title: "Fruit Plants",
            desc: "High-quality grafted fruit saplings, including local favorites and exotic varieties, optimized for high yield in Konkan climate.",
            featured: ["Mango (आंबा)", "Cashew (काजू)", "Coconut (नारळ)", "Peru (पेरू - Guava)"]
        },
        spices: {
            title: "Spice Plants",
            desc: "Aromatic and high-grade spice plant grafts including nutmeg, clove, cinnamon, and black pepper grown in the heart of Konkan.",
            featured: ["Jayfal (जायफळ - Nutmeg)", "Dalchini (दालचिनी - Cinnamon)", "Lavang (लवंग - Clove)", "Kalimiri (काळीमिरी - Black Pepper)"]
        },
        palms: {
            title: "Palms",
            desc: "Elegant and sturdy palm varieties for landscaping, compound lining, and indoor/outdoor green spaces.",
            featured: ["Areca Palm", "Areca Red Palm / Red Sealing Wax Palm", "Fox Tail Palm", "Bottle Palm"]
        },
        flowering: {
            title: "Flowering Plants",
            desc: "Vibrant, fragrant, and ornamental flowering shrubs and creepers to beautify your gardens and home exteriors.",
            featured: ["Jaswand (जास्वंद - Hibiscus)", "Mogra", "Sonchafa", "Rose"]
        },
        indoor: {
            title: "Indoor Plants",
            desc: "Air-purifying, low-maintenance indoor foliage and houseplants to bring nature inside your home and office.",
            featured: ["Money Plant / Golden Pothos", "Rubber Plant", "Peace Lily", "Snake Plant"]
        },
        hedge: {
            title: "Edge & Hedge",
            desc: "Dense and easy-to-shape foliage plants perfect for creating natural green fences, borders, and garden edges.",
            featured: ["Acalipha / Copperleaf", "Duranta / Golden Dewdrop", "Box wood / Boxwood", "Lantena / Lantana Hedge"]
        },
        creepers: {
            title: "Creepers & Climbers",
            desc: "Beautiful climbing vines and creepers to cover walls, arches, pergolas, and fences with lush green or colorful blooms.",
            featured: ["Madhumalti / Rangoon Creeper", "Gokarna / Blue Butterfly Pea Vine", "Krushna Kamal / Passion Flower Vine", "Sankrant Vel / Orange Flame Vine"]
        },
        avenue: {
            title: "Avenue Trees",
            desc: "Stately, shade-providing, and flowering trees ideal for lining roads, farm borders, and open landscape projects.",
            featured: ["Ashoka Tree", "Gulmohar / Royal Poinciana", "Badam / Indian Almond", "Bahava / Golden Shower Tree"]
        },
        medicinal: {
            title: "Medicinal Plants",
            desc: "Traditional Ayurvedic and herbal plants packed with natural health benefits for your kitchen and home pharmacy.",
            featured: ["Tulas", "Aloe vera", "Adulsa", "Sarpagandha"]
        }
    };

    // Plant Enrichments mapping
    const plantEnrichments = {
        "Mango (आंबा)": {
            scientific: "Mangifera indica",
            image: "assets/fruit_mango.jpg",
            specs: { Sunlight: "Full Sun (6+ hrs)", Watering: "Moderate", Soil: "Well-draining Loamy", Growth: "Moderate to Fast" },
            care: "Apply organic manure twice a year (June & October). Water young saplings regularly but avoid waterlogging. Prune dead branches post-harvest to encourage new growth."
        },
        "Cashew (काजू)": {
            scientific: "Anacardium occidentale",
            image: "assets/fruit_cashew.jpg",
            specs: { Sunlight: "Full Sun", Watering: "Low (Drought-tolerant)", Soil: "Laterite / Sandy", Growth: "Fast" },
            care: "Requires very low maintenance once established. Water weekly for the first year, then only during dry spells. Mulch around the base to retain moisture."
        },
        "Coconut (नारळ)": {
            scientific: "Cocos nucifera",
            image: "assets/fruit_coconut.jpg",
            specs: { Sunlight: "Full Sun", Watering: "Regular (High)", Soil: "Sandy / Well-draining", Growth: "Slow to Moderate" },
            care: "Requires regular watering and high potassium fertilizer. Clear the area around the base and apply salt once a year to improve nut yield."
        },
        "Supari (सुपारी - Areca Nut)": {
            scientific: "Areca catechu",
            image: "assets/fruit_betelnut.jpg",
            specs: { Sunlight: "Partial to Full Sun", Watering: "Regular (High)", Soil: "Clayey / Loamy", Growth: "Moderate" },
            care: "Loves humid environments and consistent moisture. Apply nitrogen-rich fertilizer and organic compost. Protect young plants from harsh afternoon sun."
        },
        "Peru (पेरू - Guava)": {
            scientific: "Psidium guajava",
            image: "assets/fruit_guava.jpg",
            specs: { Sunlight: "Full Sun", Watering: "Moderate", Soil: "Adaptable / Loamy", Growth: "Fast" },
            care: "Prune regularly to maintain shape and promote higher fruiting. Water when the topsoil feels dry. Protect fruits from birds and pests with fruit bags."
        },
        "Chiku (चिकू)": {
            scientific: "Manilkara zapota",
            image: "assets/fruit_chiku.jpg",
            specs: { Sunlight: "Full Sun", Watering: "Moderate", Soil: "Alluvial / Sandy Loam", Growth: "Slow to Moderate" },
            care: "Prune lower branches to keep the canopy clear. Fertilize with farmyard manure. Water moderately; established trees can tolerate dry periods."
        },
        "Aavla (आवळा)": {
            scientific: "Phyllanthus emblica",
            image: "assets/fruit_amla.jpg",
            specs: { Sunlight: "Full Sun", Watering: "Moderate", Soil: "Clayey / Loamy / Sandy", Growth: "Moderate" },
            care: "Loves sunshine and fertile soil. Water young saplings regularly. Apply organic compost twice a year to boost yield."
        },
        "Limbu (लिंबू - Lemon)": {
            scientific: "Citrus limon",
            image: "assets/fruit_lemon.jpg",
            specs: { Sunlight: "Full Sun (6+ hrs)", Watering: "Moderate", Soil: "Well-drained Sandy Loam", Growth: "Fast" },
            care: "Feed with citrus fertilizer regularly. Prune inside branches to allow air circulation. Keep soil moist but never soggy to prevent root rot."
        },
        "Jackfruit (फणस)": {
            scientific: "Artocarpus heterophyllus",
            image: "assets/fruit_jackfruit.jpg",
            specs: { Sunlight: "Full Sun", Watering: "Moderate", Soil: "Deep, Rich, Well-drained Loam", Growth: "Slow to Moderate" },
            care: "Requires deep soil for its strong taproot. Water young trees regularly. Prune only to remove dead wood or control height."
        },
        "Starfruit (कारंबोला)": {
            scientific: "Averrhoa carambola",
            image: "assets/fruit_starfruit.jpg",
            specs: { Sunlight: "Full Sun to Partial Shade", Watering: "Regular", Soil: "Rich, Acidic, Well-drained", Growth: "Moderate" },
            care: "Protect from strong winds. Water regularly during dry spells. Mulch around the base and apply organic fertilizer quarterly."
        },
        "Kokam (कोकम)": {
            scientific: "Garcinia indica",
            image: "assets/fruit_kokum.jpg",
            specs: { Sunlight: "Full Sun to Partial Shade", Watering: "Moderate", Soil: "Laterite / Humus-rich", Growth: "Slow to Moderate" },
            care: "Endemic to the Western Ghats. Prefers warm, humid climates. Water regularly during dry seasons and apply organic manure."
        },
        "Jaam (जाम - Rose Apple)": {
            scientific: "Syzygium jambos",
            image: "assets/fruit_roseapple.jpg",
            specs: { Sunlight: "Full Sun to Partial Shade", Watering: "Moderate to High", Soil: "Moist, Fertile, Clayey Loam", Growth: "Moderate" },
            care: "Enjoys moist environments. Water regularly during flowering and fruiting. Prune to shape and remove dead branches."
        },
        "Jambhul (जांभूळ)": {
            scientific: "Syzygium cumini",
            image: "assets/fruit_jamun.jpg",
            specs: { Sunlight: "Full Sun", Watering: "Moderate", Soil: "Deep Loamy / Well-drained", Growth: "Fast" },
            care: "Very hardy tree once established. Water regularly when young. Mulch around the trunk and fertilize annually in winter."
        },
        "Ramfal (रामफळ)": {
            scientific: "Annona reticulata",
            image: "assets/fruit_ramfal.jpg",
            specs: { Sunlight: "Full Sun", Watering: "Moderate", Soil: "Well-drained Sandy Loam", Growth: "Moderate" },
            care: "Custard apple family. Requires low watering once established. Feed with organic manure in spring. Prune to shape."
        },
        "Sitafal (सीताफळ)": {
            scientific: "Annona squamosa",
            image: "assets/fruit_sitafal.jpg",
            specs: { Sunlight: "Full Sun", Watering: "Low to Moderate", Soil: "Sandy / Rocky / Well-drained", Growth: "Moderate" },
            care: "Very hardy plant. Avoid waterlogging at all costs. Feed with organic matter before the monsoon season starts."
        },
        "Avocado (अॅव्होकॅडो)": {
            scientific: "Persea americana",
            image: "assets/fruit_avocado.jpg",
            specs: { Sunlight: "Full Sun to Partial Shade", Watering: "Moderate", Soil: "Loose, Rich, Well-drained Sandy Loam", Growth: "Moderate to Slow" },
            care: "Ensure soil drains exceptionally well to prevent root rot. Protect from strong wind drafts when young. Mulch heavily."
        },
        "Santra (संत्रा - Orange)": {
            scientific: "Citrus sinensis",
            image: "assets/fruit_santra.jpg",
            specs: { Sunlight: "Full Sun", Watering: "Moderate", Soil: "Rich, Well-draining Loamy", Growth: "Moderate" },
            care: "Water deeply once a week, letting the soil dry between waterings. Fertilize with a balanced citrus feed quarterly."
        },
        "Mosambi (मोसंबी)": {
            scientific: "Citrus limetta",
            image: "assets/fruit_mosambi.jpg",
            specs: { Sunlight: "Full Sun (6+ hrs)", Watering: "Moderate", Soil: "Well-drained Sandy Loam", Growth: "Moderate" },
            care: "Enjoys warm climates. Prune dead branches post-harvest. Add compost and zinc-rich micronutrients to boost sweet lime yield."
        },
        "Tuti (तुती - Mulberry)": {
            scientific: "Morus alba",
            image: "assets/fruit_mulberry.jpg",
            specs: { Sunlight: "Full Sun to Partial Shade", Watering: "Moderate", Soil: "Well-drained Clayey / Sandy Loam", Growth: "Fast" },
            care: "Very fast-growing tree. Prune aggressively in winter to promote heavy fruiting in spring. Drought-tolerant once established."
        },
        "Rambutan (रामबुतान)": {
            scientific: "Nephelium lappaceum",
            image: "assets/fruit_rambutan.jpg",
            specs: { Sunlight: "Full Sun to Partial Shade", Watering: "Regular (Moist)", Soil: "Deep, Rich, Acidic Loam", Growth: "Moderate" },
            care: "Exotic tropical tree. Enjoys warm temperatures, high humidity, and consistent moisture. Mulch to retain soil moisture."
        },
        "Lichi (लिची)": {
            scientific: "Litchi chinensis",
            image: "assets/fruit_lichi.jpg",
            specs: { Sunlight: "Full Sun", Watering: "Regular", Soil: "Deep, Fertile, Acidic Sandy Loam", Growth: "Slow to Moderate" },
            care: "Protect young trees from strong winds and frost. Keep root zone moist but never soggy. Apply organic compost annually."
        },
        "Chinch (चिंच - Tamarind)": {
            scientific: "Tamarindus indica",
            image: "assets/fruit_tamarind.jpg",
            specs: { Sunlight: "Full Sun", Watering: "Low to Moderate", Soil: "Deep, Well-drained, Adaptable", Growth: "Slow" },
            care: "Extremely resilient, long-lived shade tree. Highly drought and wind-resistant. Requires very little care after first year."
        },
        "Cherry (चेरी)": {
            scientific: "Prunus avium",
            image: "assets/fruit_cherry.jpg",
            specs: { Sunlight: "Full Sun to Partial Shade", Watering: "Moderate", Soil: "Deep, Fertile, Well-drained Loam", Growth: "Moderate" },
            care: "Requires well-drained soil; roots are sensitive to waterlogging. Mulch to keep roots cool. Prune in late winter."
        },
        "Raiaavla (रायआवळा)": {
            scientific: "Phyllanthus acidus",
            image: "assets/fruit_raiaavla.jpg",
            specs: { Sunlight: "Full Sun to Partial Shade", Watering: "Moderate", Soil: "Moist, Well-drained, Fertile", Growth: "Moderate to Fast" },
            care: "Produces small, acidic yellow star-shaped fruits. Water regularly. Fertilize twice a year with organic manure."
        },
        "Banana (केळी)": {
            scientific: "Musa acuminata",
            image: "assets/fruit_banana.jpg",
            specs: { Sunlight: "Full Sun", Watering: "High (Keep moist)", Soil: "Rich, Deep, Well-drained", Growth: "Very Fast" },
            care: "Heavy feeder. Enjoys plenty of organic matter, high potassium fertilizer, and deep, frequent watering. Wind protection is vital."
        },
        "Nilambi (निळंबी)": {
            scientific: "Nilambi species",
            image: "assets/fruit_nilambi.jpg",
            specs: { Sunlight: "Full Sun to Partial Shade", Watering: "Moderate", Soil: "Well-drained Loam", Growth: "Moderate" },
            care: "Local Konkan specialty fruit. Water young saplings regularly. Enrich with organic compost annually."
        },
        "Papnus (पपनस - Pomelo)": {
            scientific: "Citrus maxima",
            image: "assets/fruit_pomelo.jpg",
            specs: { Sunlight: "Full Sun", Watering: "Moderate", Soil: "Well-drained Sandy Loam", Growth: "Moderate" },
            care: "Largest citrus fruit. Keep soil moist but not soggy. Fertilize with nitrogen-rich organic feed quarterly."
        },
        "Mangosteen (मंगोस्टिन)": {
            scientific: "Garcinia mangostana",
            image: "assets/fruit_mangosteen.jpg",
            specs: { Sunlight: "Dappled Shade / Bright Indirect", Watering: "Regular (Moist)", Soil: "Deep, Rich Organic, Acidic", Growth: "Slow" },
            care: "Tropical queen of fruits. Highly sensitive to direct hot sun when young. Requires consistent high humidity."
        },
        "Karvand (करवंद)": {
            scientific: "Carissa carandas",
            image: "assets/fruit_karvand.jpg",
            specs: { Sunlight: "Full Sun", Watering: "Low (Drought-tolerant)", Soil: "Adaptable / Poor Soils", Growth: "Moderate to Fast" },
            care: "Native thorny shrub. Extremely resilient and drought-resistant. Prune post-harvest to control growth."
        },
        "Shevga (शेवगा - Drumstick)": {
            scientific: "Moringa oleifera",
            image: "assets/fruit_drumstick.jpg",
            specs: { Sunlight: "Full Sun", Watering: "Low to Moderate", Soil: "Sandy / Well-drained", Growth: "Very Fast" },
            care: "Fast-growing tree. Cut back main branch at 3-4 feet to encourage side branches. Avoid waterlogging."
        },
        "Papaya (पपई)": {
            scientific: "Carica papaya",
            image: "assets/fruit_papaya.jpg",
            specs: { Sunlight: "Full Sun (6+ hrs)", Watering: "Moderate", Soil: "Well-draining Loamy", Growth: "Very Fast" },
            care: "Enjoys warm weather and high fertility. Water regularly but ensure soil drains completely to avoid collar rot."
        },
        "Coffee (कॉफी)": {
            scientific: "Coffea arabica",
            image: "assets/fruit_coffee.jpg",
            specs: { Sunlight: "Dappled Sunlight / Partial Shade", Watering: "Moderate", Soil: "Deep, Rich, Acidic", Growth: "Moderate" },
            care: "Grows well under shade trees. Water regularly during flowering season. Feed with nitrogen-rich fertilizer."
        },
        "Jayfal": {
            scientific: "Myristica fragrans",
            image: "assets/spice_jayfal.jpg",
            specs: { Sunlight: "Filtered Sun / Partial Shade", Watering: "Regular", Soil: "Humus-rich Loamy", Growth: "Slow" },
            care: "Thrives in warm, humid coastal climates with partial shade. Keep soil moist but well-drained. Protect from dry winds."
        },
        "Dalchini": {
            scientific: "Cinnamomum verum",
            image: "assets/spice_dalchini.jpg",
            specs: { Sunlight: "Partial Shade to Full Sun", Watering: "Moderate", Soil: "Sandy Loam / Laterite", Growth: "Moderate" },
            care: "Prune stems regularly to encourage bushier growth and more bark harvest. Keep soil organic-rich. Enjoys high humidity."
        },
        "Lavang": {
            scientific: "Syzygium aromaticum",
            image: "assets/spice_lavang.jpg",
            specs: { Sunlight: "Dappled Sun / Partial Shade", Watering: "Regular (High)", Soil: "Rich Clayey Loam", Growth: "Slow" },
            care: "Thrives best in wet tropical climates. Requires constant moisture and rich organic mulching. Protect from intense heat waves."
        },
        "Kalimiri": {
            scientific: "Piper nigrum",
            image: "assets/spice_kalimiri.jpg",
            specs: { Sunlight: "Partial Shade / Dappled Light", Watering: "Regular", Soil: "Humus-rich, Well-drained", Growth: "Medium (Climber)" },
            care: "Needs a sturdy trellis or support tree (like Areca nut palm). Mist regularly to maintain humidity. Mulch the root zone to keep it cool."
        },
        "Allspice": {
            scientific: "Pimenta dioica",
            image: "assets/spice_allspice.jpg",
            specs: { Sunlight: "Full Sun", Watering: "Moderate", Soil: "Well-drained Sandy/Loamy", Growth: "Moderate" },
            care: "Upright allspice shrub with leathery, aromatic leaves that combine flavors of cinnamon, nutmeg, and cloves. Water when topsoil is dry."
        },
        "Tejpatta": {
            scientific: "Cinnamomum tamala",
            image: "assets/spice_tejpatta.jpg",
            specs: { Sunlight: "Full Sun to Partial Shade", Watering: "Moderate", Soil: "Well-draining Loam", Growth: "Moderate" },
            care: "Also known as Indian Bay Leaf. Enjoys warm, humid climate. Harvest leaves once the tree is 2-3 years old and dry them in shade."
        },
        "Velchi": {
            scientific: "Elettaria cardamomum",
            image: "assets/spice_velchi.jpg",
            specs: { Sunlight: "Filtered Sunlight / Dappled Shade", Watering: "Regular (Keep moist)", Soil: "Humus-rich, Acidic Loam", Growth: "Moderate" },
            care: "Lush cardamom plant that loves high humidity and cool roots. Mist leaves regularly and protect from direct afternoon sun."
        },
        "Halad": {
            scientific: "Curcuma longa",
            image: "assets/spice_halad.jpg",
            specs: { Sunlight: "Full Sun to Partial Shade", Watering: "Moderate", Soil: "Rich, Loose, Well-draining", Growth: "Fast" },
            care: "Broad leafy tropical ginger family plant. Harvest fresh turmeric rhizomes once leaves begin to yellow and dry out (approx. 8-9 months)."
        },
        "Kadipatta": {
            scientific: "Murraya koenigii",
            image: "assets/spice_kadipatta.jpg",
            specs: { Sunlight: "Full Sun", Watering: "Moderate", Soil: "Well-draining Sandy/Loamy", Growth: "Moderate to Fast" },
            care: "Bushy curry leaf plant with fine green pinnate foliage. Fertilize with sour buttermilk or organic manure to stimulate leaf growth. Avoid overwatering."
        },
        "Money plant": {
            scientific: "Epipremnum aureum",
            image: "assets/indoor_moneyplant.jpg",
            specs: { Sunlight: "Bright Indirect Light", Watering: "Moderate (Let dry)", Soil: "Well-drained Potting Mix", Growth: "Fast" },
            care: "Lush trailing heart-shaped foliage with golden-green variegation. Extremely resilient. Grows well in soil or water. Avoid direct harsh sun."
        },
        "Peace Lily": {
            scientific: "Spathiphyllum",
            image: "assets/indoor_peacelily.jpg",
            specs: { Sunlight: "Low to Bright Indirect Light", Watering: "Moderate (Keep moist)", Soil: "Rich, Well-draining", Growth: "Moderate" },
            care: "Tolerates low light. Droops when thirsty, indicating it is time to water. Clean leaves occasionally to remove dust. Toxic to pets."
        },
        "Snake plant": {
            scientific: "Sansevieria trifasciata",
            image: "assets/indoor_snakeplant.jpg",
            specs: { Sunlight: "Low to Full Sun", Watering: "Low (Very dry)", Soil: "Well-draining Cactus Mix", Growth: "Slow" },
            care: "Architectural upright leaves. Excellent air purifier. Extremely hardy; survives neglect and low light. Do not overwater; roots rot easily."
        },
        "Rubber plant": {
            scientific: "Ficus elastica",
            image: "assets/indoor_rubberplant.jpg",
            specs: { Sunlight: "Bright Indirect Light", Watering: "Moderate", Soil: "Well-draining Loamy", Growth: "Moderate to Fast" },
            care: "Thick glossy burgundy-green leaves. Avoid overwatering or moving it frequently. Wipe leaves with a damp cloth to maintain shine."
        },
        "Fiddle leaf fig": {
            scientific: "Ficus lyrata",
            image: "assets/indoor_fiddleleaffig.jpg",
            specs: { Sunlight: "Bright Filtered Light", Watering: "Moderate", Soil: "Well-draining Potting Mix", Growth: "Moderate" },
            care: "Stunning violin-shaped foliage. Water only when the top 2 inches of soil are dry. Keep away from cold drafts or air conditioners."
        },
        "Alocasia": {
            scientific: "Alocasia amazonica",
            image: "assets/indoor_alocasia.jpg",
            specs: { Sunlight: "Bright Indirect Light", Watering: "Regular (Keep moist)", Soil: "Rich, Aerated, Well-drained", Growth: "Moderate" },
            care: "Dramatic dark green leaves with silvery veins. Loves high humidity and warm temperatures. Reduce watering in winter months."
        },
        "Aglonema": {
            scientific: "Aglaonema",
            image: "assets/indoor_aglonema.jpg",
            specs: { Sunlight: "Low to Bright Indirect Light", Watering: "Moderate", Soil: "Well-draining Soil Mix", Growth: "Slow to Moderate" },
            care: "Lush pink, red, and green variegated foliage. Highly adaptable to low light. Let the soil dry out partially between waterings."
        },
        "Jade": {
            scientific: "Crassula ovata",
            image: "assets/indoor_jade.jpg",
            specs: { Sunlight: "Direct to Bright Indirect Sun", Watering: "Low (Succulent)", Soil: "Sandy Cacti Mix", Growth: "Slow to Moderate" },
            care: "Woody stem with thick fleshy green succulent leaves. Water only when the soil is completely dry. Bring indoors in cold weather."
        },
        "Anthurium": {
            scientific: "Anthurium andraeanum",
            image: "assets/indoor_anthurium.jpg",
            specs: { Sunlight: "Bright Indirect Light", Watering: "Moderate", Soil: "Peat-rich, Well-draining", Growth: "Slow to Moderate" },
            care: "Flamingo flower with bright red waxy spathes. Requires high humidity. Keep soil evenly moist but never soggy. Protect from direct sun."
        },
        "Singonium": {
            scientific: "Syngonium podophyllum",
            image: "assets/indoor_singonium.jpg",
            specs: { Sunlight: "Bright Indirect to Semi-Shade", Watering: "Moderate", Soil: "Well-drained Potting Soil", Growth: "Fast (Climber)" },
            care: "Arrowhead leaves mottled with pink and green. Prune to keep it bushy or provide a support stake to climb. Prefers humid settings."
        },
        "Maranta": {
            scientific: "Maranta leuconeura",
            image: "assets/indoor_maranta.jpg",
            specs: { Sunlight: "Medium to Low Indirect Light", Watering: "Regular (Keep moist)", Soil: "Well-drained Peat-based", Growth: "Moderate" },
            care: "Prayer Plant. Leaves fold up at night. Keep soil consistently moist but not soggy. Mist leaves to keep humidity high."
        },
        "Diffenbachia": {
            scientific: "Dieffenbachia",
            image: "assets/indoor_diffenbachia.jpg",
            specs: { Sunlight: "Filtered Bright Light", Watering: "Moderate", Soil: "Loose, Well-draining Mix", Growth: "Moderate" },
            care: "Large variegated cream and green foliage. Keep soil moist but avoid waterlogging. Sap is toxic; keep away from children and pets."
        },
        "Poinsettia": {
            scientific: "Euphorbia pulcherrima",
            image: "assets/indoor_poinsettia.jpg",
            specs: { Sunlight: "Bright Indirect Light", Watering: "Moderate", Soil: "Well-draining Potting Mix", Growth: "Moderate" },
            care: "Crimson-red star-shaped floral bracts. Water only when the soil surface feels dry. Keep in dark rooms at night to stimulate red bract color."
        },
        "Redmacher": {
            scientific: "Radermachera sinica",
            image: "assets/indoor_redmacher.jpg",
            specs: { Sunlight: "Bright Indirect Light", Watering: "Moderate (Keep moist)", Soil: "Rich, Well-drained", Growth: "Fast" },
            care: "China Doll Plant. Lacy, glossy green leaves forming a bushy canopy. Keep in a stable location as it drops leaves when moved."
        },
        "Cactus": {
            scientific: "Mammillaria & Succulents",
            image: "assets/indoor_cactus.jpg",
            specs: { Sunlight: "Full Sun / Very Bright Light", Watering: "Low (Rarely)", Soil: "Sandy Cacti & Succulent Mix", Growth: "Slow" },
            care: "Decorative arrangement of drought-hardy desert cacti. Water once a month in winter, and twice a month in summer. Ensure perfect drainage."
        },
        "Philodendron": {
            scientific: "Philodendron 'Birkin'",
            image: "assets/indoor_philodendron.jpg",
            specs: { Sunlight: "Bright Indirect Light", Watering: "Moderate", Soil: "Loose, Organic-rich Mix", Growth: "Moderate" },
            care: "Stunning leaves with pinstriped variegation. Keep in a warm room and water when top 2 inches of soil are dry. Mist occasionally."
        },
        "Ribbon grass": {
            scientific: "Chlorophytum",
            image: "assets/indoor_ribbongrass.jpg",
            specs: { Sunlight: "Bright Indirect to Partial Shade", Watering: "Moderate", Soil: "Well-drained, Fertile", Growth: "Fast" },
            care: "Dense arching green and white striped grass. Drought tolerant once established. Trim brown tips and water moderately."
        },
        "Fern": {
            scientific: "Nephrolepis exaltata",
            image: "assets/indoor_fern.jpg",
            specs: { Sunlight: "Dappled Light / Shade", Watering: "Regular (Keep moist)", Soil: "Organic-rich, Peaty", Growth: "Moderate to Fast" },
            care: "Boston Fern. Arching feathery fronds. Requires high humidity; ideal for bathrooms. Keep soil moist and mist daily."
        },
        "Spider plant": {
            scientific: "Chlorophytum comosum",
            image: "assets/indoor_spiderplant.jpg",
            specs: { Sunlight: "Indirect Light / Partial Shade", Watering: "Moderate", Soil: "Well-drained Potting Soil", Growth: "Fast" },
            care: "Produces cascading spiderettes. Adapts to varied conditions. Water when soil dries slightly. Excellent for hanging baskets."
        },
        "Pepromia": {
            scientific: "Peperomia obtusifolia",
            image: "assets/indoor_pepromia.jpg",
            specs: { Sunlight: "Bright Indirect to Low Light", Watering: "Low to Moderate", Soil: "Well-draining Potting Mix", Growth: "Slow to Moderate" },
            care: "Thick fleshy rubbery green leaves. Acts like a semi-succulent. Water only when soil is mostly dry. Avoid overwatering."
        },
        "Calanthia": {
            scientific: "Calathea orbifolia",
            image: "assets/indoor_calanthia.jpg",
            specs: { Sunlight: "Medium Indirect / Partial Shade", Watering: "Regular (Keep moist)", Soil: "Peat-rich, Well-aerated", Growth: "Slow to Moderate" },
            care: "Peacock plant with broad silver-striped leaves. Prefers filtered water to prevent leaf edge burn. Requires high humidity."
        },
        "Fittronia": {
            scientific: "Fittonia albivenis",
            image: "assets/indoor_fittronia.jpg",
            specs: { Sunlight: "Medium to Low Indirect Light", Watering: "Regular (Keep moist)", Soil: "Rich, Well-drained", Growth: "Moderate" },
            care: "Nerve plant. Will faint or droop dramatically when dry and perk up quickly after watering. Loves high humidity and terrariums."
        },
        "Bird of paradise": {
            scientific: "Strelitzia nicolai",
            image: "assets/indoor_birdofparadise.jpg",
            specs: { Sunlight: "Bright Direct to Indirect Sun", Watering: "Moderate", Soil: "Rich, Deep, Well-drained", Growth: "Moderate to Fast" },
            care: "Large statement plant with tall banana-like leaves. Thrives in bright sunny spots. Water when the top soil dries out."
        },
        "Broken heart": {
            scientific: "Monstera adansonii",
            image: "assets/indoor_brokenheart.jpg",
            specs: { Sunlight: "Bright Indirect Light", Watering: "Moderate", Soil: "Aroid Soil Mix (Chunky)", Growth: "Fast (Climber)" },
            care: "Swiss cheese vine. Provide a moss pole to climb. Mist regularly and fertilize monthly in growing season. Avoid direct hot sun."
        },
        "Serrisa": {
            scientific: "Serissa foetida",
            image: "assets/indoor_serrisa.jpg",
            specs: { Sunlight: "Bright Indirect Light", Watering: "Moderate (Keep moist)", Soil: "Well-drained Bonsai Soil", Growth: "Slow" },
            care: "Miniature bonsai with white flowers. Sensitive to environmental changes; may drop leaves if moved. Keep in a stable, humid spot."
        },
        "Asperagus": {
            scientific: "Asparagus setaceus",
            image: "assets/indoor_asparagus.jpg",
            specs: { Sunlight: "Bright Indirect Light / Semi-shade", Watering: "Moderate (Keep moist)", Soil: "Rich, Well-drained Loam", Growth: "Fast" },
            care: "Asparagus Fern. Soft feathery foliage. Keep soil lightly moist and provide bright indirect light. Spritz leaves regularly."
        },
        "Jaswand (जास्वंद - Hibiscus)": {
            scientific: "Hibiscus rosa-sinensis",
            image: "assets/hibiscus.jpg",
            specs: { Sunlight: "Full Sun (6+ hrs)", Watering: "Regular", Soil: "Rich, Well-drained", Growth: "Fast" },
            care: "Feed with high-potassium fertilizer monthly during the blooming season. Prune in spring to maintain shape and encourage fresh flowering buds."
        },
        "Mogra": {
            scientific: "Jasminum sambac",
            image: "assets/real_nursery_4.jpg",
            specs: { Sunlight: "Full Sun to Partial Shade", Watering: "Moderate", Soil: "Well-drained Loamy", Growth: "Moderate" },
            care: "Prune heavily after the winter season to stimulate spring blooms. Water regularly but avoid soggy roots. Feed with organic compost."
        },
        "Sonchafa": {
            scientific: "Magnolia champaca",
            image: "assets/real_nursery_4.jpg",
            specs: { Sunlight: "Full Sun to Partial Shade", Watering: "Moderate", Soil: "Deep, Rich, Acidic", Growth: "Moderate" },
            care: "Requires space as it grows into a beautiful small tree. Water deeply but infrequently. Add compost to maintain soil acidity."
        },
        "Rose": {
            scientific: "Rosa",
            image: "assets/real_nursery_4.jpg",
            specs: { Sunlight: "Full Sun (6+ hrs)", Watering: "Moderate", Soil: "Rich, Clayey Loam", Growth: "Moderate" },
            care: "Prune in October/November. Water at the base (avoid wetting leaves to prevent black spots). Feed with specialized rose fertilizer."
        },
        "Monstera / Houseplants (मॉन्स्टेरा)": {
            scientific: "Monstera deliciosa",
            image: "assets/real_nursery_5.jpg",
            specs: { Sunlight: "Bright Indirect Light", Watering: "Low (When dry)", Soil: "Aery, Well-draining", Growth: "Moderate" },
            care: "Wipe leaves weekly to remove dust. Allow the soil to dry out almost completely between waterings. Provide a moss pole for climbing."
        },

        "Areca Palm": {
            scientific: "Dypsis lutescens",
            image: "assets/palm_areca.jpg",
            specs: { Sunlight: "Bright Indirect Light", Watering: "Moderate", Soil: "Slightly Acidic, Well-drained", Growth: "Moderate" },
            care: "Feathery golden-green arching fronds in a sleek modern white planter. Keep soil lightly moist but not soggy. Feed with liquid fertilizer during growing season."
        },
        "Areca Red Palm": {
            scientific: "Cyrtostachys renda",
            image: "assets/palm_areca_red.jpg",
            specs: { Sunlight: "Full Sun to Partial Shade", Watering: "High (Loves moisture)", Soil: "Peaty / Wet Soil", Growth: "Slow to Moderate" },
            care: "Red Sealing Wax Palm. Rare ornamental palm famous for its vibrant scarlet-red trunk crownshafts. Must be kept consistently warm and highly humid."
        },
        "Bottle Palm": {
            scientific: "Hyophorbe lagenicaulis",
            image: "assets/palm_bottle.jpg",
            specs: { Sunlight: "Full Sun", Watering: "Moderate", Soil: "Well-drained Sandy", Growth: "Very Slow" },
            care: "Bottle Palm. Unique specimen palm featuring a swollen bottle-shaped trunk base. Loves warm sunny spots and moderate watering with excellent drainage."
        },
        "Fox Tail Palm": {
            scientific: "Wodyetia bifurcata",
            image: "assets/palm_foxtail.jpg",
            specs: { Sunlight: "Full Sun (6+ hrs)", Watering: "Moderate", Soil: "Well-draining Sandy Loam", Growth: "Fast" },
            care: "Fox Tail Palm. Elegant landscape palm with bushy, bottle-brush plume fronds resembling a fox tail. Very hardy once established; fertilize 2-3 times a year."
        },
        "Fan Palm": {
            scientific: "Livistona chinensis",
            image: "assets/palm_fan.jpg",
            specs: { Sunlight: "Bright Indirect Light to Full Sun", Watering: "Moderate", Soil: "Clayey / Sandy Loam", Growth: "Slow" },
            care: "Chinese Fan Palm. Tropical palm with broad circular palmate fan leaves and drooping tips. Water deeply when topsoil feels dry."
        },
        "Raphis Palm": {
            scientific: "Rhapis excelsa",
            image: "assets/palm_raphis.jpg",
            specs: { Sunlight: "Indirect Light / Partial Shade", Watering: "Moderate", Soil: "Loamy / Well-draining", Growth: "Slow" },
            care: "Lady Palm. Multi-stemmed clump-forming palm with glossy dark green fan-shaped leaf segments. Thrives in indoor shaded spots and humid rooms."
        },
        "Bismarkia Palm": {
            scientific: "Bismarckia nobilis",
            image: "assets/palm_bismarkia.jpg",
            specs: { Sunlight: "Full Sun (6+ hrs)", Watering: "Low to Moderate", Soil: "Deep, Well-drained Loam", Growth: "Slow to Moderate" },
            care: "Silver Bismarck Palm. Majestic centerpiece palm displaying huge rigid fan fronds in striking silvery-blue hues. Highly drought and wind tolerant."
        },
        // Hedge & Edge Plants
        "Acalipha": {
            scientific: "Acalypha wilkesiana",
            image: "assets/hedge_acalipha.jpg",
            specs: { Sunlight: "Full Sun to Partial Shade", Watering: "Moderate", Soil: "Well-drained, Organic Loam", Growth: "Fast" },
            care: "Copperleaf. Dense colorful hedge shrub with bronze, red, and copper variegated leaves. Prune regularly to maintain hedge density and vibrant foliage color."
        },
        "Duranta": {
            scientific: "Duranta erecta 'Gold Mound'",
            image: "assets/hedge_duranta.jpg",
            specs: { Sunlight: "Full Sun (6+ hrs)", Watering: "Moderate", Soil: "Well-drained Adaptable", Growth: "Fast" },
            care: "Golden Dewdrop. Bright lime-green and golden foliage hedge, ideal for compact garden borders and topiary. Prune frequently to encourage bushy growth."
        },
        "Bamboo Grass": {
            scientific: "Pennisetum setaceum",
            image: "assets/hedge_bamboograss.jpg",
            specs: { Sunlight: "Full Sun", Watering: "Low to Moderate", Soil: "Sandy, Well-drained", Growth: "Fast" },
            care: "Ornamental border grass with arching golden-green blades and feathery plumes. Drought-tolerant once established. Cut back annually to promote fresh shoots."
        },
        "Box wood": {
            scientific: "Buxus microphylla",
            image: "assets/hedge_boxwood.jpg",
            specs: { Sunlight: "Full Sun to Partial Shade", Watering: "Moderate", Soil: "Rich, Well-drained Loam", Growth: "Slow to Moderate" },
            care: "Classic formal hedging and topiary shrub. Trim regularly into neat spheres or crisp border hedges. Water at root zone and avoid soggy roots."
        },
        "Kupia Hedge": {
            scientific: "Cuphea hyssopifolia",
            image: "assets/hedge_kupia.jpg",
            specs: { Sunlight: "Full Sun to Semi-Shade", Watering: "Moderate (Keep moist)", Soil: "Fertile, Well-drained", Growth: "Moderate" },
            care: "False Heather. Fine-textured evergreen border edging plant studded with delicate purple florets. Great for lining walkways and low garden borders."
        },
        "Lantena Hedge": {
            scientific: "Lantana camara",
            image: "assets/hedge_lantena.jpg",
            specs: { Sunlight: "Full Sun (6+ hrs)", Watering: "Low (Drought-hardy)", Soil: "Poor to Moderate, Well-drained", Growth: "Fast" },
            care: "Hardy, pollinator-friendly hedging shrub bearing abundant clusters of orange, yellow, and pink flowers. Highly drought and heat resistant."
        },
        "Malpighia": {
            scientific: "Malpighia coccigera",
            image: "assets/hedge_malpighia.jpg",
            specs: { Sunlight: "Full Sun to Partial Shade", Watering: "Moderate", Soil: "Well-drained Loamy", Growth: "Slow to Moderate" },
            care: "Singapore Holly. Compact dwarf shrub with spiny holly-like leaves and pale pink blooms. Excellent for miniature formal hedges and bonsai shaping."
        },
        "Phylunthus": {
            scientific: "Breynia disticha",
            image: "assets/hedge_phylunthus.jpg",
            specs: { Sunlight: "Bright Indirect to Full Sun", Watering: "Moderate (Keep moist)", Soil: "Humus-rich, Well-drained", Growth: "Moderate" },
            care: "Snow Bush. Spectacular hedging plant with rounded leaves variegated in white, pink, and rose tones. Provide regular watering and pinch tips to maintain fullness."
        },
        "Boat Lily": {
            scientific: "Tradescantia spathacea",
            image: "assets/hedge_boatlily.jpg",
            specs: { Sunlight: "Partial Shade to Bright Light", Watering: "Low to Moderate", Soil: "Well-drained Potting Soil", Growth: "Moderate" },
            care: "Moses-in-the-Cradle. Compact low-growing border edging plant with sword leaves featuring deep purple undersides. Tolerates dry spells and thrives in shaded garden edges."
        },
        "Serrisa Hedge": {
            scientific: "Serissa foetida",
            image: "assets/hedge_serrisa.jpg",
            specs: { Sunlight: "Full Sun to Dappled Shade", Watering: "Moderate (Keep moist)", Soil: "Well-drained Fertile", Growth: "Slow to Moderate" },
            care: "Snowrose Hedge. Trimmed mound of fine dark green foliage covered in star-shaped white blossoms. Sensitive to dry soil; maintain regular watering."
        },
        "Pendanus": {
            scientific: "Pandanus baptistii",
            image: "assets/hedge_pendanus.jpg",
            specs: { Sunlight: "Full Sun to Partial Shade", Watering: "Moderate", Soil: "Sandy Loam, Well-drained", Growth: "Moderate" },
            care: "Screw Pine. Striking architectural edging plant with arching yellow and green striped spineless leaves. Very hardy and salt-tolerant."
        },
        "Golden Papua": {
            scientific: "Polyscias guilfoylei",
            image: "assets/hedge_goldenpapua.jpg",
            specs: { Sunlight: "Partial Shade to Full Sun", Watering: "Moderate", Soil: "Rich, Well-drained", Growth: "Moderate" },
            care: "Golden Aralia. Upright bushy hedge shrub with serrated golden-yellow and green variegated foliage. Protect from frost and water when topsoil dries."
        },
        "Jatropha Hedge": {
            scientific: "Jatropha integerrima",
            image: "assets/hedge_jatropha.jpg",
            specs: { Sunlight: "Full Sun (6+ hrs)", Watering: "Low to Moderate", Soil: "Well-drained Soil", Growth: "Fast" },
            care: "Peregrina Hedge. Trimmed flowering hedge mound featuring dark green leaves and brilliant clusters of coral-red flowers that attract butterflies year-round."
        },

        // Creepers & Climbers
        "Madhumalti": {
            scientific: "Combretum indicum",
            image: "assets/creeper_madhumalti.jpg",
            specs: { Sunlight: "Full Sun (6+ hrs)", Watering: "Moderate", Soil: "Well-drained, Fertile", Growth: "Fast" },
            care: "Rangoon Creeper. Vigorous flowering climber with pendulous clusters of fragrant star flowers color-shifting from white to pink and deep red. Provide strong trellises or arches."
        },
        "Gokarna": {
            scientific: "Clitoria ternatea",
            image: "assets/creeper_gokarna.jpg",
            specs: { Sunlight: "Full Sun to Partial Shade", Watering: "Moderate", Soil: "Rich, Well-drained", Growth: "Fast" },
            care: "Blue Butterfly Pea. Graceful climbing vine loaded with striking cobalt-blue blossoms used in Ayurvedic herbal teas. Provide light bamboo netting or trellis."
        },
        "Bigonia": {
            scientific: "Pyrostegia venusta",
            image: "assets/creeper_bigonia.jpg",
            specs: { Sunlight: "Full Sun", Watering: "Moderate", Soil: "Well-drained, Sandy Loam", Growth: "Fast" },
            care: "Flame Vine. Showy evergreen climber bearing dense cascading clusters of bright tubular orange trumpet flowers during winter and spring. Needs a sunny pergola or fence."
        },
        "Lasun Vel": {
            scientific: "Mansoa alliacea",
            image: "assets/creeper_lasunvel.jpg",
            specs: { Sunlight: "Full Sun to Partial Shade", Watering: "Moderate", Soil: "Rich, Well-draining", Growth: "Fast" },
            care: "Garlic Vine. Ornamental climber decorated with tri-color clusters of lavender, violet, and white trumpet blossoms. Crushed leaves give off a mild garlic aroma."
        },
        "Krushna Kamal": {
            scientific: "Passiflora caerulea",
            image: "assets/creeper_krushnakamal.jpg",
            specs: { Sunlight: "Full Sun to Dappled Shade", Watering: "Regular (Keep moist)", Soil: "Moist, Well-drained Loam", Growth: "Fast" },
            care: "Blue Passion Flower. Sacred exotic vine featuring intricate circular blossoms with purple, blue, and white filaments. Train on fences or garden trellises."
        },
        "Passion Fruit": {
            scientific: "Passiflora edulis",
            image: "assets/creeper_passionfruit.jpg",
            specs: { Sunlight: "Full Sun (6+ hrs)", Watering: "Regular (Deep)", Soil: "Rich Organic, Well-drained", Growth: "Fast" },
            care: "Fruiting climber with lush three-lobed leaves, fragrant white-purple passion flowers, and sweet-tart purple passion fruits. Provide sturdy wire trellis."
        },
        "Icecream Vel": {
            scientific: "Mandevilla sanderi",
            image: "assets/creeper_icecreamvel.jpg",
            specs: { Sunlight: "Bright Indirect to Full Sun", Watering: "Moderate", Soil: "Peat-rich, Well-draining", Growth: "Moderate" },
            care: "Pink Mandevilla. Tropical climber carrying abundant soft pink trumpet-shaped flowers with bright yellow throats. Keep soil lightly moist and provide climbing support."
        },
        "Badak Vel": {
            scientific: "Aristolochia elegans",
            image: "assets/creeper_badakvel.jpg",
            specs: { Sunlight: "Partial Shade to Dappled Sun", Watering: "Moderate (Keep moist)", Soil: "Rich, Moisture-retentive", Growth: "Fast" },
            care: "Dutchman's Pipe. Unique exotic climber displaying large mottled reddish-purple pipe-shaped flowers. Host plant for swallowtail butterflies."
        },
        "Sankrant Vel": {
            scientific: "Pyrostegia venusta",
            image: "assets/creeper_sankrantvel.jpg",
            specs: { Sunlight: "Full Sun", Watering: "Moderate", Soil: "Well-drained Loam", Growth: "Fast" },
            care: "Sankrant Vine. Fiery seasonal climber overflowing with vibrant reddish-orange trumpet floral bunches around Makar Sankranti. Perfect for boundary walls."
        },
        "Thubergia": {
            scientific: "Thunbergia grandiflora",
            image: "assets/creeper_thubergia.jpg",
            specs: { Sunlight: "Full Sun to Partial Shade", Watering: "Regular", Soil: "Rich, Well-drained", Growth: "Very Fast" },
            care: "Blue Sky Vine. Vigorous woody climber with large, breathtaking violet-blue trumpet blooms that cascade downwards. Excellent for heavy pergolas and garden arches."
        },
        // Avenue Trees & Landscaping
        "Ashoka": {
            scientific: "Polyalthia longifolia",
            image: "assets/avenue_ashoka.jpg",
            specs: { Sunlight: "Full Sun", Watering: "Moderate", Soil: "Deep, Well-drained", Growth: "Fast" },
            care: "False Ashoka Mast Tree. Tall, symmetrical, pillar-like columnar tree with glossy weeping foliage. Excellent for noise barriers and boundary windbreaks."
        },
        "Gulmohar": {
            scientific: "Delonix regia",
            image: "assets/avenue_gulmohar.jpg",
            specs: { Sunlight: "Full Sun (6+ hrs)", Watering: "Low (Once established)", Soil: "Well-drained Sandy Loam", Growth: "Fast" },
            care: "Royal Poinciana. Magnificent shade tree with fern-like bipinnate leaves and fiery red-orange summer floral canopies. Requires wide open outdoor space."
        },
        "Badam": {
            scientific: "Terminalia catappa",
            image: "assets/avenue_badam.jpg",
            specs: { Sunlight: "Full Sun", Watering: "Moderate", Soil: "Sandy, Coastal Adaptable", Growth: "Fast" },
            care: "Indian Almond (Desi Badam). Stately shade tree with large glossy leathery leaves arranged in distinct horizontal tiers. Leaves turn vibrant red before shedding."
        },
        "Bahava": {
            scientific: "Cassia fistula",
            image: "assets/avenue_bahava.jpg",
            specs: { Sunlight: "Full Sun (6+ hrs)", Watering: "Moderate", Soil: "Well-drained Loam", Growth: "Moderate" },
            care: "Golden Shower Tree (Amaltas). Renowned for spectacular pendulous cascades of fragrant golden-yellow blossoms in summer. Highly drought tolerant once mature."
        },
        "Bakul Tree": {
            scientific: "Mimusops elengi",
            image: "assets/avenue_bakul.jpg",
            specs: { Sunlight: "Full Sun to Partial Shade", Watering: "Moderate", Soil: "Rich, Well-drained Loam", Growth: "Slow to Moderate" },
            care: "Spanish Cherry / Maulsari. Evergreen shade tree with dark glossy leaves and star-shaped cream flowers known for heavenly fragrance that lasts even after drying."
        },
        "Bitti Tree": {
            scientific: "Cascabela thevetia",
            image: "assets/avenue_bitti.jpg",
            specs: { Sunlight: "Full Sun", Watering: "Low to Moderate", Soil: "Well-drained Adaptable", Growth: "Fast" },
            care: "Yellow Oleander / Pila Kaner. Bushy evergreen small avenue tree with narrow willow-like leaves and bright yellow trumpet flowers. Very hardy and drought resistant."
        },
        "Bottle Brush Tree": {
            scientific: "Callistemon citrinus",
            image: "assets/avenue_bottlebrush.jpg",
            specs: { Sunlight: "Full Sun (6+ hrs)", Watering: "Moderate", Soil: "Moist, Well-drained", Growth: "Moderate" },
            care: "Bottle Brush. Graceful weeping ornamental tree adorned with cylindrical scarlet-red brush-like floral spikes that attract nectar-feeding birds."
        },
        "Buch": {
            scientific: "Millingtonia hortensis",
            image: "assets/avenue_buch.jpg",
            specs: { Sunlight: "Full Sun", Watering: "Moderate", Soil: "Deep, Well-drained", Growth: "Fast" },
            care: "Indian Cork Tree (Akash Neem). Tall slender evergreen tree featuring deeply furrowed corky bark and deeply fragrant long-tubed white flowers that bloom at night."
        },
        "Kadamba": {
            scientific: "Neolamarckia cadamba",
            image: "assets/avenue_kadamba.jpg",
            specs: { Sunlight: "Full Sun", Watering: "Regular (Moist)", Soil: "Rich Alluvial Loam", Growth: "Very Fast" },
            care: "Burflower-tree / Kadam. Fast-growing holy tree with huge broad glossy leaves and globe-shaped scented orange-yellow flowers. Prefers moist soils."
        },
        "Kailashpati": {
            scientific: "Couroupita guianensis",
            image: "assets/avenue_kailashpati.jpg",
            specs: { Sunlight: "Full Sun", Watering: "Regular", Soil: "Rich Organic Loam", Growth: "Moderate" },
            care: "Cannonball Tree / Shiv Kamal. Sacred exotic avenue tree with clusters of fragrant hooded pink-red flowers growing directly on the trunk, followed by large cannonball fruits."
        },
        "Kanchan Tree": {
            scientific: "Bauhinia purpurea",
            image: "assets/avenue_kanchan.jpg",
            specs: { Sunlight: "Full Sun to Semi-Shade", Watering: "Moderate", Soil: "Fertile, Well-drained", Growth: "Moderate" },
            care: "Purple Orchid Tree / Raktakanchan. Features distinctive butterfly-shaped leaves and abundant magenta-purple orchid-like blooms in winter."
        },
        "Muchkund": {
            scientific: "Pterospermum acerifolium",
            image: "assets/avenue_muchkund.jpg",
            specs: { Sunlight: "Full Sun to Partial Shade", Watering: "Moderate", Soil: "Deep, Fertile Loam", Growth: "Fast" },
            care: "Dinner Plate Tree (Kanak Champa). Large stately shade tree with huge maple-shaped leaves having silver felty undersides and fragrant white nocturnal flowers."
        },
        "Neelmohar": {
            scientific: "Jacaranda mimosifolia",
            image: "assets/avenue_neelmohar.jpg",
            specs: { Sunlight: "Full Sun (6+ hrs)", Watering: "Moderate", Soil: "Sandy Loam, Well-drained", Growth: "Fast" },
            care: "Blue Jacaranda / Neelmohar. Breathtaking ornamental avenue tree loaded with dense canopies of violet-blue bell blossoms in springtime."
        },
        "Peltophorum": {
            scientific: "Peltophorum pterocarpum",
            image: "assets/avenue_peltophorum.jpg",
            specs: { Sunlight: "Full Sun", Watering: "Low (Drought-hardy)", Soil: "Poor to Rich, Well-drained", Growth: "Fast" },
            care: "Yellow Flame Tree (Peela Gulmohar). Large spreading umbrella crown covered with upright panicles of fragrant yellow crinkled flowers and copper seedpods."
        },
        "Rain Tree": {
            scientific: "Samanea saman",
            image: "assets/avenue_raintree.jpg",
            specs: { Sunlight: "Full Sun", Watering: "Moderate", Soil: "Adaptable, Well-drained", Growth: "Very Fast" },
            care: "Rain Tree (Vilayati Siris). Massive wide-canopied umbrella shade tree with bipinnate leaves that fold during cloudy days and pink powderpuff blossoms."
        },
        "Silver Oak": {
            scientific: "Grevillea robusta",
            image: "assets/avenue_silveroak.jpg",
            specs: { Sunlight: "Full Sun", Watering: "Low to Moderate", Soil: "Well-drained Acidic to Neutral", Growth: "Fast" },
            care: "Silver Oak. Stately upright columnar tree with deeply cut silvery-green fern foliage and golden-orange brush flowers. Highly wind resistant."
        },
        "Spathodia": {
            scientific: "Spathodea campanulata",
            image: "assets/avenue_spathodia.jpg",
            specs: { Sunlight: "Full Sun", Watering: "Moderate", Soil: "Rich, Well-drained", Growth: "Fast" },
            care: "African Tulip Tree (Pichkari). Fast-growing avenue tree crowned with clusters of bright fiery orange-crimson cup-shaped flowers. Attracts birds and pollinators."
        },
        "Samudra Fal": {
            scientific: "Barringtonia asiatica",
            image: "assets/avenue_samudrafal.jpg",
            specs: { Sunlight: "Full Sun to Partial Shade", Watering: "Regular", Soil: "Sandy, Saline-tolerant", Growth: "Moderate" },
            care: "Sea Poison Tree (Fish Poison Tree). Evergreen coastal shade tree with glossy leathery leaves, large night-blooming pink-tipped flowers, and box-shaped fibrous fruits."
        },
        "Sitaranjan": {
            scientific: "Guatteria longifolia",
            image: "assets/avenue_sitaranjan.jpg",
            specs: { Sunlight: "Full Sun", Watering: "Moderate", Soil: "Deep, Well-drained", Growth: "Moderate to Fast" },
            care: "Mast Tree / Sitaranjan. Elegant pyramidal tree with dense weeping dark green foliage. Ideal for formal avenue lining and noise buffering."
        },
        "Savar": {
            scientific: "Bombax ceiba",
            image: "assets/avenue_savar.jpg",
            specs: { Sunlight: "Full Sun (6+ hrs)", Watering: "Low (Once established)", Soil: "Deep, Well-drained", Growth: "Fast" },
            care: "Red Silk Cotton Tree (Semal / काटे सावर). Majestic spiny-trunked tree that drops leaves in winter and explodes with massive fleshy red cup flowers in spring."
        },
        "Shendari": {
            scientific: "Mallotus philippensis",
            image: "assets/avenue_shendari.jpg",
            specs: { Sunlight: "Full Sun to Partial Shade", Watering: "Moderate", Soil: "Well-drained Loamy", Growth: "Moderate" },
            care: "Kamala Tree (Rohini). Compact evergreen woodland tree with broad leaves and red glandular fruit clusters historically used for natural kumkum dyeing."
        },
        "Surangi": {
            scientific: "Mammea suriga",
            image: "assets/avenue_surangi.jpg",
            specs: { Sunlight: "Full Sun to Dappled Shade", Watering: "Moderate", Soil: "Laterite / Well-drained Loam", Growth: "Slow to Moderate" },
            care: "Surangi. Prized Konkan evergreen tree with thick rigid glossy leaves and exquisitely fragrant white flower buds clustered along woody branches."
        },
        "Suru": {
            scientific: "Casuarina equisetifolia",
            image: "assets/avenue_suru.jpg",
            specs: { Sunlight: "Full Sun", Watering: "Low to Moderate", Soil: "Sandy, Saline-tolerant", Growth: "Very Fast" },
            care: "Whistling Pine (Casuarina). Hardy coastal windbreak tree with slender needle-like branchlets that produce a soothing whispering sound in ocean breezes."
        },
        "Tabubia": {
            scientific: "Tabebuia rosea",
            image: "assets/avenue_tabubia.jpg",
            specs: { Sunlight: "Full Sun (6+ hrs)", Watering: "Moderate", Soil: "Well-drained Loam", Growth: "Fast" },
            care: "Pink Trumpet Tree (Pink Poui). Spectacular flowering avenue tree that sheds its foliage in spring to produce overwhelming canopies of pink trumpet flowers."
        },
        "Sita Ashok Tree": {
            scientific: "Saraca asoca",
            image: "assets/avenue_sitaashok.jpg",
            specs: { Sunlight: "Partial Shade to Dappled Sunlight", Watering: "Regular (Moist)", Soil: "Humus-rich, Well-drained", Growth: "Slow to Moderate" },
            care: "True Sita Ashok. Sacred evergreen rainforest tree with drooping young foliage and dense fragrant orange-yellow flower balls along the branches."
        },
        "Cycus": {
            scientific: "Cycas revoluta",
            image: "assets/avenue_cycus.jpg",
            specs: { Sunlight: "Bright Indirect to Full Sun", Watering: "Low (Drought-hardy)", Soil: "Sandy, Well-drained", Growth: "Very Slow" },
            care: "Sago Palm / Living Fossil. Stately prehistoric architectural plant with deep green feather-like rosette fronds on a thick woody trunk. Water sparingly."
        },
        "Xmas Tree": {
            scientific: "Araucaria excelsa",
            image: "assets/avenue_xmastree.jpg",
            specs: { Sunlight: "Full Sun to Bright Light", Watering: "Moderate", Soil: "Well-drained, Slightly Acidic", Growth: "Moderate" },
            care: "Norfolk Island Pine / Christmas Tree. Striking evergreen conifer featuring perfectly symmetrical tiered horizontal branches. Ideal focal landscape tree."
        },
        "Sheesham": {
            scientific: "Dalbergia sissoo",
            image: "assets/avenue_sheesham.jpg",
            specs: { Sunlight: "Full Sun", Watering: "Low to Moderate", Soil: "Deep Alluvial, Well-drained", Growth: "Fast" },
            care: "Indian Rosewood (Shisham). Premier hardwood timber and avenue tree with leathery pinnate leaves and small yellowish-white fragrant flowers."
        },
        "Kashid": {
            scientific: "Senna siamea",
            image: "assets/avenue_kashid.jpg",
            specs: { Sunlight: "Full Sun", Watering: "Low (Drought-hardy)", Soil: "Adaptable, Well-drained", Growth: "Fast" },
            care: "Siamese Cassia (Kassod). Medium to large evergreen avenue tree featuring dense green pinnate leaves and terminal upright clusters of bright yellow blooms."
        },
        "Karanj": {
            scientific: "Millettia pinnata",
            image: "assets/avenue_karanj.jpg",
            specs: { Sunlight: "Full Sun", Watering: "Low to Moderate", Soil: "Tough, Saline & Waterlogging Tolerant", Growth: "Fast" },
            care: "Pongamia Tree (Indian Beech). Highly hardy nitrogen-fixing avenue shade tree with glossy bright green leaves and scented pale pinkish-purple blossoms."
        },
        "Palas": {
            scientific: "Butea monosperma",
            image: "assets/avenue_palas.jpg",
            specs: { Sunlight: "Full Sun", Watering: "Low (Very drought-hardy)", Soil: "Poor, Saline, or Clayey", Growth: "Moderate" },
            care: "Flame of the Forest (पळस / Kesudo). Iconic Indian tree that sheds foliage in spring to unveil a fiery canopy of scarlet-orange parrot-beak blossoms."
        },
        "Behda": {
            scientific: "Terminalia bellirica",
            image: "assets/avenue_behda.jpg",
            specs: { Sunlight: "Full Sun", Watering: "Moderate", Soil: "Well-drained Loamy", Growth: "Fast" },
            care: "Baheda (Bibhitaki). Major constituent of Ayurvedic Triphala. Large stately deciduous tree with clustered oval leaves and valuable medicinal fruits."
        },
        "Neem Tree": {
            scientific: "Azadirachta indica",
            image: "assets/avenue_neem.jpg",
            specs: { Sunlight: "Full Sun (6+ hrs)", Watering: "Low (Drought-hardy)", Soil: "Dry, Stony, Well-drained", Growth: "Fast" },
            care: "Indian Lilac (कडुलिंब). Renowned universal medicinal tree with deeply purifying air benefits. Thrives in dry climates with minimal maintenance."
        },
        "Pimpal": {
            scientific: "Ficus religiosa",
            image: "assets/avenue_pimpal.jpg",
            specs: { Sunlight: "Full Sun", Watering: "Moderate", Soil: "Deep, Well-drained", Growth: "Very Fast" },
            care: "Sacred Fig (Bodhi Tree / पिंपळ). Long-lived massive shade tree with fluttering heart-shaped leaves possessing distinctive tail tips. Outstanding oxygen producer."
        },
        "Tamhan": {
            scientific: "Lagerstroemia speciosa",
            image: "assets/avenue_tamhan.jpg",
            specs: { Sunlight: "Full Sun (6+ hrs)", Watering: "Moderate", Soil: "Rich, Moisture-retentive Loam", Growth: "Moderate" },
            care: "Pride of India (जारूळ / ताम्हण). State Flower of Maharashtra. Stunning avenue tree producing magnificent upright panicles of crinkled mauve-purple blossoms."
        },
        "Tulas": {
            scientific: "Ocimum tenuiflorum",
            image: "assets/medicinal_tulsi.jpg",
            specs: { Sunlight: "Full Sun (4-6 hours)", Watering: "Regular (Damp)", Soil: "Rich, Well-drained", Growth: "Moderate" },
            care: "Pinch flower buds (manjiri) regularly to extend leaf production and make the plant bushier. Water when the topsoil feels dry."
        },
        "Aloe vera": {
            scientific: "Aloe barbadensis miller",
            image: "assets/medicinal_aloevera.jpg",
            specs: { Sunlight: "Indirect Sunlight", Watering: "Low", Soil: "Sandy / Cacti Mix", Growth: "Moderate" },
            care: "Water sparingly, allowing soil to dry out completely. Grow in pots with large drainage holes. Protect from freezing temperatures."
        },
        "Ashvagandha": {
            scientific: "Withania somnifera",
            image: "assets/medicinal_ashvagandha.jpg",
            specs: { Sunlight: "Full Sun", Watering: "Low", Soil: "Sandy, Well-drained", Growth: "Moderate" },
            care: "Drought-tolerant. Water only when the soil is completely dry. Avoid waterlogging as it is sensitive to root rot."
        },
        "Shatavari": {
            scientific: "Asparagus racemosus",
            image: "assets/medicinal_shatavari.jpg",
            specs: { Sunlight: "Partial Shade to Full Sun", Watering: "Moderate", Soil: "Sandy Loam / Rich", Growth: "Fast" },
            care: "Requires climbing support. Thrives in humid conditions. Water when topsoil feels dry."
        },
        "Kadulimb": {
            scientific: "Azadirachta indica",
            image: "assets/medicinal_neem.jpg",
            specs: { Sunlight: "Full Sun", Watering: "Low (Once established)", Soil: "Well-drained Sandy/Clayey", Growth: "Fast" },
            care: "Extremely hardy tree. Water regularly when young. Enjoys hot, dry climates."
        },
        "Giloy": {
            scientific: "Tinospora cordifolia",
            image: "assets/medicinal_giloy.jpg",
            specs: { Sunlight: "Full Sun to Partial Shade", Watering: "Moderate", Soil: "Well-drained Loamy", Growth: "Fast" },
            care: "Provide a stake or trellis for climbing. Requires moderate watering and responds well to regular compost."
        },
        "Pudina": {
            scientific: "Mentha",
            image: "assets/medicinal_mint.jpg",
            specs: { Sunlight: "Partial Shade", Watering: "High (Keep moist)", Soil: "Rich, Humus-rich", Growth: "Very Fast" },
            care: "Invasive grower. Best grown in pots to contain spreading. Keep soil damp and pinch tips regularly to encourage bushiness."
        },
        "Halad (हळद - Turmeric)": {
            scientific: "Curcuma longa",
            image: "assets/medicinal_turmeric.jpg",
            specs: { Sunlight: "Partial Shade to Full Sun", Watering: "Regular", Soil: "Loose, Humus-rich, Well-drained", Growth: "Moderate" },
            care: "Requires loose soil for rhizome expansion. Keep soil moist but never waterlogged during growing season."
        },
        "Adulsa": {
            scientific: "Justicia adhatoda",
            image: "assets/medicinal_adulsa.jpg",
            specs: { Sunlight: "Full Sun to Partial Shade", Watering: "Moderate", Soil: "Loamy / Well-drained", Growth: "Moderate" },
            care: "A highly resilient medicinal shrub. Water regularly but avoid waterlogging. Prune occasionally to maintain a compact bush shape."
        },
        "Sarpagandha": {
            scientific: "Rauvolfia serpentina",
            image: "assets/medicinal_sarpagandha.jpg",
            specs: { Sunlight: "Partial Shade / Dappled Light", Watering: "Moderate", Soil: "Humus-rich, Well-drained", Growth: "Slow" },
            care: "Requires shade and protection from dry winds. Keep soil consistently moist but not soggy."
        },
        "Hadsandhi": {
            scientific: "Cissus quadrangularis",
            image: "assets/medicinal_hadsandhi.jpg",
            specs: { Sunlight: "Full Sun", Watering: "Low (Cactus-like)", Soil: "Sandy / Cacti Mix", Growth: "Moderate" },
            care: "Extremely drought-resistant succulent climber. Water very sparingly. Grows best in hanging baskets or containers."
        },
        "Kavath": {
            scientific: "Limonia acidissima",
            image: "assets/medicinal_kavath.jpg",
            specs: { Sunlight: "Full Sun", Watering: "Low to Moderate", Soil: "Adaptable / Dry Soil", Growth: "Slow" },
            care: "Hardy tropical tree. Water young saplings regularly. Prefers dry climates and well-draining soil."
        },
        "Bibba": {
            scientific: "Semecarpus anacardium",
            image: "assets/medicinal_bibba.jpg",
            specs: { Sunlight: "Full Sun to Partial Shade", Watering: "Moderate", Soil: "Deep, Well-drained Loamy", Growth: "Slow" },
            care: "Handle saplings with care as the sap can be an irritant. Water regularly when young."
        },
        "Arjun": {
            scientific: "Terminalia arjuna",
            image: "assets/medicinal_arjun.jpg",
            specs: { Sunlight: "Full Sun", Watering: "Moderate", Soil: "Deep, Fertile, Moist", Growth: "Moderate" },
            care: "Requires deep soil and regular moisture. Ideal for riverbanks or areas with high water tables."
        },
        "Kapur": {
            scientific: "Ocimum kilimandscharicum",
            image: "assets/medicinal_kapur.jpg",
            specs: { Sunlight: "Full Sun (4-6 hours)", Watering: "Regular (Damp)", Soil: "Rich, Well-drained", Growth: "Moderate" },
            care: "Aromatic camphor basil. Pinch flower spikes to promote bushy leaf growth. Water when the topsoil feels dry."
        },
        "Dhup": {
            scientific: "Vateria indica",
            image: "assets/medicinal_dhup.jpg",
            specs: { Sunlight: "Full Sun to Partial Shade", Watering: "Moderate", Soil: "Deep, Humus-rich", Growth: "Slow" },
            care: "Loves high humidity and moist, rich soils. Protect young saplings from harsh midday sun."
        },
        "Bramhi": {
            scientific: "Bacopa monnieri",
            image: "assets/medicinal_bramhi.jpg",
            specs: { Sunlight: "Full Sun to Partial Shade", Watering: "High (Loves water)", Soil: "Wet / Marshy Soil", Growth: "Fast" },
            care: "Can be grown in boggy areas or shallow water. Keep soil wet at all times. Great as a trailing groundcover."
        },
        "Gavti chaha": {
            scientific: "Cymbopogon citratus",
            image: "assets/medicinal_gavti_chaha.jpg",
            specs: { Sunlight: "Full Sun", Watering: "Moderate", Soil: "Well-drained Sandy Loam", Growth: "Fast" },
            care: "Lemongrass. Drought-tolerant once established. Trim old leaves and split root clumps to propagate."
        },
        "Erand": {
            scientific: "Ricinus communis",
            image: "assets/medicinal_erand.jpg",
            specs: { Sunlight: "Full Sun", Watering: "Low to Moderate", Soil: "Well-drained Sandy", Growth: "Very Fast" },
            care: "Fast-growing castor oil plant. Requires very little care. Seeds are toxic, handle with care."
        },
        "Mogra": {
            scientific: "Jasminum sambac",
            image: "assets/flowering_mogra.jpg",
            specs: { Sunlight: "Full Sun to Partial Shade", Watering: "Moderate", Soil: "Well-drained Loamy", Growth: "Moderate" },
            care: "Prune heavily after the winter season to stimulate spring blooms. Water regularly but avoid soggy roots. Feed with organic compost."
        },
        "Jaswand (जास्वंद - Hibiscus)": {
            scientific: "Hibiscus rosa-sinensis",
            image: "assets/flowering_jaswand.jpg",
            specs: { Sunlight: "Full Sun (6+ hrs)", Watering: "Regular", Soil: "Well-drained, Rich, Acidic", Growth: "Fast" },
            care: "Protect from harsh frost. Prune in early spring to shape. Fertilize monthly with potassium-rich feed to boost flowering."
        },
        "Sonchafa": {
            scientific: "Magnolia champaca",
            image: "assets/flowering_sonchafa.jpg",
            specs: { Sunlight: "Full Sun to Partial Shade", Watering: "Moderate", Soil: "Deep, Rich, Acidic", Growth: "Moderate" },
            care: "Requires space as it grows into a beautiful small tree. Water deeply but infrequently. Add compost to maintain soil acidity."
        },
        "Rose": {
            scientific: "Rosa",
            image: "assets/flowering_rose.jpg",
            specs: { Sunlight: "Full Sun (6+ hrs)", Watering: "Moderate", Soil: "Rich, Clayey Loam", Growth: "Moderate" },
            care: "Prune in October/November. Water at the base (avoid wetting leaves to prevent black spots). Feed with specialized rose fertilizer."
        },
        "Bougainvillea": {
            scientific: "Bougainvillea spectabilis",
            image: "assets/flowering_bougainvillea.jpg",
            specs: { Sunlight: "Full Sun (6+ hrs)", Watering: "Low", Soil: "Dry, Sandy, Well-drained", Growth: "Fast" },
            care: "Needs maximum sunlight to bloom. Water only when the soil is dry. Prune frequently after blooms fade to stimulate new bracts."
        },
        "Ixora": {
            scientific: "Ixora coccinea",
            image: "assets/flowering_ixora.jpg",
            specs: { Sunlight: "Full Sun to Partial Shade", Watering: "Moderate", Soil: "Acidic, Well-drained, Rich", Growth: "Moderate" },
            care: "Enjoys warm temperatures and high humidity. Keep soil evenly moist. Fertilize with an acid-loving plant food."
        },
        "Ananta": {
            scientific: "Gardenia jasminoides",
            image: "assets/flowering_ananta.jpg",
            specs: { Sunlight: "Bright Indirect Light / Partial Shade", Watering: "Regular", Soil: "Acidic, Moist, Rich Organic", Growth: "Moderate" },
            care: "Highly fragrant. Enjoys humid environments. Water when topsoil is dry, but never allow root zone to become soggy."
        },
        "Parijatak": {
            scientific: "Nyctanthes arbor-tristis",
            image: "assets/flowering_parijatak.jpg",
            specs: { Sunlight: "Full Sun to Partial Shade", Watering: "Moderate", Soil: "Loamy, Well-drained", Growth: "Fast" },
            care: "Flowers bloom at night and fall at dawn. Tolerates dry soil once established. Prune in spring to keep bushy."
        },
        "Ratrani": {
            scientific: "Cestrum nocturnum",
            image: "assets/flowering_ratrani.jpg",
            specs: { Sunlight: "Full Sun to Partial Shade", Watering: "Moderate", Soil: "Rich, Well-drained Loamy", Growth: "Fast" },
            care: "Night-scented jasmine. Prune regularly after flowering to control size and shape. Needs protection from severe cold."
        },
        "Madhumalti": {
            scientific: "Combretum indicum",
            image: "assets/flowering_madhumalti.jpg",
            specs: { Sunlight: "Full Sun", Watering: "Moderate", Soil: "Well-drained, Fertile", Growth: "Fast" },
            care: "Provide strong support (walls, trellises). Prune after flowering season to control spreading. Water regularly during dry spells."
        },
        "Krushna Kamal": {
            scientific: "Passiflora",
            image: "assets/flowering_krushnakamal.jpg",
            specs: { Sunlight: "Full Sun to Partial Shade", Watering: "Regular", Soil: "Moist, Well-drained Loam", Growth: "Fast" },
            care: "Climbing passion flower. Requires strong trellis support. Mulch to keep roots cool and water regularly."
        },
        "White Chafa": {
            scientific: "Plumeria obtusa",
            image: "assets/flowering_whitechafa.jpg",
            specs: { Sunlight: "Full Sun (6+ hrs)", Watering: "Low", Soil: "Dry, Sandy, Well-drained", Growth: "Moderate" },
            care: "Drought-tolerant succulent tree. Water sparingly, only when soil is dry. Avoid cold drafty spaces."
        },
        "Gokarna": {
            scientific: "Clitoria ternatea",
            image: "assets/flowering_gokarna.jpg",
            specs: { Sunlight: "Full Sun to Dappled Light", Watering: "Regular", Soil: "Rich, Well-draining", Growth: "Fast (Annual/Perennial)" },
            care: "Keep soil moist. Pinch growing tips to encourage branching. Provide light stakes or netting for support."
        },
        "Aboli": {
            scientific: "Crossandra infundibuliformis",
            image: "assets/flowering_aboli.jpg",
            specs: { Sunlight: "Bright Indirect Light / Partial Shade", Watering: "Moderate", Soil: "Rich, Moist, Well-draining", Growth: "Moderate" },
            care: "Provides continuous blooms. Water with lukewarm water and keep soil moist. Remove faded flower spikes."
        },
        "Tagar": {
            scientific: "Tabernaemontana divaricata",
            image: "assets/flowering_tagar.jpg",
            specs: { Sunlight: "Full Sun to Partial Shade", Watering: "Moderate", Soil: "Well-drained Loamy", Growth: "Fast" },
            care: "Highly resilient. Prune lightly to keep compact. Prefers moist, fertile soils but is highly adaptable."
        },
        "Jui": {
            scientific: "Jasminum auriculatum",
            image: "assets/flowering_jui.jpg",
            specs: { Sunlight: "Full Sun", Watering: "Moderate", Soil: "Well-drained, Rich", Growth: "Moderate" },
            care: "Fragrant star jasmine. Give climbing support or prune regularly to maintain as a compact shrub. Enjoys monthly organic feed."
        },
        "Kanher": {
            scientific: "Nerium oleander",
            image: "assets/flowering_kanher.jpg",
            specs: { Sunlight: "Full Sun", Watering: "Low to Moderate", Soil: "Adaptable / Poor Soils", Growth: "Fast" },
            care: "Extremely tough, heat-tolerant, and drought-resistant. All parts of the plant are toxic; handle with care and keep away from pets."
        },
        "Kunda": {
            scientific: "Jasminum multiflorum",
            image: "assets/flowering_kunda.jpg",
            specs: { Sunlight: "Full Sun to Dappled Light", Watering: "Moderate", Soil: "Well-drained Sandy Loam", Growth: "Moderate" },
            care: "Cascading downy jasmine. Flowers heavily in winter. Prune after the main winter flowering flush."
        },
        "Orchid": {
            scientific: "Orchidaceae",
            image: "assets/flowering_orchid.jpg",
            specs: { Sunlight: "Dappled Shade / Indirect Light", Watering: "Low (Mist roots)", Soil: "Coarse Bark / Charcoal Mix", Growth: "Slow" },
            care: "Epiphytic plant. Do not grow in regular soil. Water once a week, allowing water to drain completely. Enjoys high humidity."
        },
        "Mini Tagar": {
            scientific: "Tabernaemontana divaricata 'Mini'",
            image: "assets/flowering_minitagar.jpg",
            specs: { Sunlight: "Full Sun to Partial Shade", Watering: "Moderate", Soil: "Well-drained Loamy", Growth: "Slow to Moderate" },
            care: "Dwarf variety. Perfect for pot culture or low garden borders. Prune tips to maintain a round, neat bush."
        },
        "Melastoma": {
            scientific: "Melastoma malabathricum",
            image: "assets/flowering_melastoma.jpg",
            specs: { Sunlight: "Full Sun", Watering: "Moderate", Soil: "Moist, Acidic", Growth: "Fast" },
            care: "Requires full sun and moist, slightly acidic soil. Prune after flowering to encourage fresh blooms."
        },
        "Mini Ixora": {
            scientific: "Ixora coccinea 'Compakta'",
            image: "assets/flowering_miniixora.jpg",
            specs: { Sunlight: "Full Sun to Partial Shade", Watering: "Moderate", Soil: "Acidic, Well-drained", Growth: "Slow" },
            care: "Perfect dwarf shrub for borders or pots. Keep soil damp. Acidify soil occasionally with compost."
        },
        "Mini Rose": {
            scientific: "Rosa 'Miniature'",
            image: "assets/flowering_minirose.jpg",
            specs: { Sunlight: "Full Sun (6+ hrs)", Watering: "Moderate", Soil: "Rich, Well-draining", Growth: "Moderate" },
            care: "Prune dead flowers (deadheading) to encourage continuous blooms. Feed every 2 weeks during flowering season."
        },
        "Alamenda": {
            scientific: "Allamanda cathartica",
            image: "assets/flowering_alamenda.jpg",
            specs: { Sunlight: "Full Sun (6+ hrs)", Watering: "Regular", Soil: "Rich, Well-drained, Fertile", Growth: "Fast" },
            care: "Provide climbing support if grown as a vine, or prune heavily to maintain as a shrub. Water regularly when growing."
        },
        "Kardal": {
            scientific: "Canna indica",
            image: "assets/flowering_kardal.jpg",
            specs: { Sunlight: "Full Sun", Watering: "High (Loves moisture)", Soil: "Rich, Wet Soil", Growth: "Fast" },
            care: "Canna Lily. Needs plenty of moisture. Can be grown near water features. Cut back stalks after flowering."
        },
        "Lantena": {
            scientific: "Lantana camara",
            image: "assets/flowering_lantena.jpg",
            specs: { Sunlight: "Full Sun (6+ hrs)", Watering: "Low", Soil: "Poor / Well-drained Sandy", Growth: "Fast" },
            care: "Extremely hardy and drought-tolerant. Prune aggressively in spring to keep it bushy. Attracts butterflies."
        },
        "Raitiya": {
            scientific: "Wrightia antidysenterica",
            image: "assets/flowering_raitiya.jpg",
            specs: { Sunlight: "Full Sun to Partial Shade", Watering: "Moderate", Soil: "Loamy, Well-drained", Growth: "Moderate" },
            care: "Snowflake plant. Keep soil moist. Prune occasionally to maintain form. Responds well to organic compost."
        },
        "Musanda": {
            scientific: "Mussaenda erythrophylla",
            image: "assets/flowering_musanda.jpg",
            specs: { Sunlight: "Full Sun to Dappled Shade", Watering: "Regular", Soil: "Humus-rich, Moist, Well-drained", Growth: "Moderate" },
            care: "Protects from frost. Water regularly to keep root zone moist. Fertilize with slow-release organic feed in spring."
        },
        "Jai": {
            scientific: "Jasminum grandiflorum",
            image: "assets/flowering_jai.jpg",
            specs: { Sunlight: "Full Sun", Watering: "Moderate", Soil: "Rich, Well-drained Loam", Growth: "Moderate to Fast" },
            care: "Highly fragrant climber. Provide trellis support. Prune after flowering season to keep neat."
        },
        "Lili": {
            scientific: "Lilium",
            image: "assets/flowering_lili.jpg",
            specs: { Sunlight: "Full Sun to Partial Shade", Watering: "Moderate (Keep moist)", Soil: "Well-drained Rich Loam", Growth: "Moderate" },
            care: "Plant bulbs in cool, shaded soil while leaves receive sun. Water regularly during growth. Keep soil mulched."
        },
        "Himelia": {
            scientific: "Hamelia patens",
            image: "assets/flowering_himelia.jpg",
            specs: { Sunlight: "Full Sun", Watering: "Moderate", Soil: "Adaptable / Well-draining", Growth: "Fast" },
            care: "Firebush. Loves warmth and sun. Once established, it is very drought-tolerant. Attracts hummingbirds."
        },
        "Aster": {
            scientific: "Asteraceae",
            image: "assets/flowering_aster.jpg",
            specs: { Sunlight: "Full Sun to Partial Shade", Watering: "Regular", Soil: "Moist, Well-drained Loam", Growth: "Moderate" },
            care: "Keep soil evenly moist. Pinch back stems in early summer to promote bushier growth and more flowers."
        },
        "Pitonia": {
            scientific: "Petunia",
            image: "assets/flowering_pitonia.jpg",
            specs: { Sunlight: "Full Sun (6+ hrs)", Watering: "Regular (Avoid soggy)", Soil: "Fertile, Light, Well-drained", Growth: "Fast" },
            care: "Deadhead spent blooms regularly to promote continuous flowering. Feed weekly with water-soluble fertilizer."
        },
        "Salvia": {
            scientific: "Salvia splendens",
            image: "assets/flowering_salvia.jpg",
            specs: { Sunlight: "Full Sun to Dappled Shade", Watering: "Moderate", Soil: "Moist, Rich, Well-drained", Growth: "Moderate" },
            care: "Water regularly, avoiding soggy soil. Pinch off faded flower spikes to encourage new blooms."
        },
        "Balsome": {
            scientific: "Impatiens balsamica",
            image: "assets/flowering_balsome.jpg",
            specs: { Sunlight: "Partial Shade / Filtered Light", Watering: "High (Keep moist)", Soil: "Rich, Humus-rich, Moist", Growth: "Fast" },
            care: "Keep soil moist at all times; leaves droop quickly if dry. Protect from direct harsh afternoon sun."
        },
        "Kupia": {
            scientific: "Cuphea hyssopifolia",
            image: "assets/flowering_kupia.jpg",
            specs: { Sunlight: "Full Sun to Partial Shade", Watering: "Moderate", Soil: "Adaptable, Well-drained", Growth: "Moderate" },
            care: "False heather. Extremely adaptable. Trim lightly in early spring to maintain a tidy dome shape."
        },
        "Euforbia": {
            scientific: "Euphorbia milii",
            image: "assets/flowering_euforbia.jpg",
            specs: { Sunlight: "Full Sun (6+ hrs)", Watering: "Low (Drought-tolerant)", Soil: "Sandy, Dry Cacti Mix", Growth: "Slow" },
            care: "Crown of Thorns. Water only when the top few inches of soil are dry. Be careful of sharp thorns and milky sap."
        },
        "Sayli": {
            scientific: "Jasminum malabaricum",
            image: "assets/flowering_sayli.jpg",
            specs: { Sunlight: "Full Sun to Dappled Light", Watering: "Moderate", Soil: "Well-drained Loam", Growth: "Moderate to Fast" },
            care: "Fragrant wild climber. Provide stakes or climb support. Water when the topsoil feels dry."
        },
        "Gladiolus": {
            scientific: "Gladiolus",
            image: "assets/flowering_gladiolus.jpg",
            specs: { Sunlight: "Full Sun", Watering: "Moderate", Soil: "Rich, Well-drained Loam", Growth: "Moderate" },
            care: "Needs stakes for support when flower spikes get heavy. Keep soil moist during growth and flowering."
        },
        "Clorodendrum": {
            scientific: "Clerodendrum thomsoniae",
            image: "assets/flowering_clorodendrum.jpg",
            specs: { Sunlight: "Dappled Shade / Bright Indirect Light", Watering: "Regular (Keep moist)", Soil: "Rich, Well-draining", Growth: "Moderate" },
            care: "Bleeding Heart vine. Thrives in humid conditions. Provide support for twining. Water when topsoil is dry."
        },
        "Lemonia": {
            scientific: "Ravenia spectabilis",
            image: "assets/flowering_lemonia.jpg",
            specs: { Sunlight: "Full Sun to Partial Shade", Watering: "Moderate", Soil: "Well-drained Loamy", Growth: "Moderate" },
            care: "Keep soil moist. Responds well to monthly organic feeding. Prune occasionally to maintain form."
        },
        "Hirwa Chafa": {
            scientific: "Artabotrys hexapetalus",
            image: "assets/flowering_hirwachafa.jpg",
            specs: { Sunlight: "Full Sun to Dappled Shade", Watering: "Moderate", Soil: "Fertile, Well-drained", Growth: "Slow to Moderate" },
            care: "Ylang Ylang vine. Highly fragrant flowers. Requires strong climber support. Water regularly when young."
        },
        "Sita Ashok": {
            scientific: "Saraca asoca",
            image: "assets/flowering_sitaashok.jpg",
            specs: { Sunlight: "Full Sun to Partial Shade", Watering: "Moderate", Soil: "Deep, Rich, Clayey Loam", Growth: "Slow" },
            care: "Keep soil moist and roots cool. Apply organic fertilizer twice a year. Highly revered sacred tree."
        },
        "Ranjai": {
            scientific: "Clematis heynei",
            image: "assets/flowering_ranjai.jpg",
            specs: { Sunlight: "Full Sun to Dappled Shade", Watering: "Moderate", Soil: "Loose, Rich, Well-draining", Growth: "Fast" },
            care: "Wild clematis vine. Provide climbing mesh or stakes. Keep roots cool using mulch and water regularly."
        },
        "Kalanchoe": {
            scientific: "Kalanchoe blossfeldiana",
            image: "assets/flowering_kalanchoe.jpg",
            specs: { Sunlight: "Bright Indirect Light", Watering: "Low (Succulent)", Soil: "Sandy Cacti Mix", Growth: "Slow" },
            care: "Water only when soil is completely dry. Remove faded flower heads. Avoid splashing water on leaves."
        },
        "Bitti": {
            scientific: "Tabernaemontana divaricata 'Flore Pleno'",
            image: "assets/flowering_bitti.jpg",
            specs: { Sunlight: "Full Sun to Dappled Shade", Watering: "Moderate", Soil: "Well-drained Loam", Growth: "Moderate" },
            care: "Double crape jasmine. Resilient shrub. Water regularly but avoid root rot. Apply organic compost."
        },
        "Jatropha": {
            scientific: "Jatropha integerrima",
            image: "assets/flowering_jatropha.jpg",
            specs: { Sunlight: "Full Sun", Watering: "Low to Moderate", Soil: "Well-drained, Adaptable", Growth: "Fast" },
            care: "Blooms year-round. Heat and drought-tolerant once established. Prune lightly to maintain a tree-like shape."
        },
        "Tikoma": {
            scientific: "Tecoma stans",
            image: "assets/flowering_tikoma.jpg",
            specs: { Sunlight: "Full Sun (6+ hrs)", Watering: "Low to Moderate", Soil: "Sandy / Well-drained", Growth: "Fast" },
            care: "Yellow Bells. Loves hot and sunny locations. Drought-tolerant once established. Prune after bloom season."
        },
        "Kamini": {
            scientific: "Murraya paniculata",
            image: "assets/flowering_kamini.jpg",
            specs: { Sunlight: "Full Sun to Partial Shade", Watering: "Moderate", Soil: "Well-drained Loam", Growth: "Moderate" },
            care: "Orange jasmine. Fragrant white blossoms. Water when topsoil is dry. Highly popular for bonsai and screens."
        },
        "Kavti Chafa": {
            scientific: "Magnolia hodgsonii",
            image: "assets/flowering_kavtichafa.jpg",
            specs: { Sunlight: "Partial Shade / Dappled Light", Watering: "Moderate", Soil: "Humus-rich, Moist, Well-drained", Growth: "Slow" },
            care: "Egg Magnolia. Requires shelter from strong winds. Mulch to retain soil moisture. Water regularly."
        },
        "Dev Chafa": {
            scientific: "Plumeria rubra",
            image: "assets/flowering_devchafa.jpg",
            specs: { Sunlight: "Full Sun (6+ hrs)", Watering: "Low (Drought-tolerant)", Soil: "Dry, Sandy, Well-drained", Growth: "Moderate" },
            care: "Red Frangipani. Drought-tolerant. Water very sparingly. Avoid waterlogging at all costs to prevent stem rot."
        },
        "Pentas": {
            scientific: "Pentas lanceolata",
            image: "assets/flowering_pentas.jpg",
            specs: { Sunlight: "Full Sun to Partial Shade", Watering: "Moderate", Soil: "Rich, Well-drained Loam", Growth: "Moderate" },
            care: "Blooms continuously. Water when topsoil is dry. Pinch spent flower heads to encourage new buds."
        },
        "Sontakka": {
            scientific: "Hedychium coronarium",
            image: "assets/flowering_sontakka.jpg",
            specs: { Sunlight: "Full Sun to Dappled Shade", Watering: "High (Loves dampness)", Soil: "Rich, Clayey, Moist", Growth: "Fast" },
            care: "White Ginger Lily. Thrives in moist or marshy conditions near water features. Cut back stalks after flowering."
        },
        "Bakul Shrub": {
            scientific: "Mimusops elengi",
            image: "assets/flowering_bakulshrub.jpg",
            specs: { Sunlight: "Full Sun", Watering: "Moderate", Soil: "Deep, Well-drained Loamy", Growth: "Slow" },
            care: "Highly aromatic tiny flowers. Grows into a small dense shrub. Water regularly when young."
        }
    };

    // Helper to enrich plant object with defaults based on category
    function getEnrichedPlant(plant) {
        let plantName = plant.name.trim();
        
        // Normalize common name variations to match specific lookup keys
        const lowerName = plantName.toLowerCase();
        
        // Normalize common name variations to match specific lookup keys (case-insensitive)
        if (lowerName.includes("mango") || lowerName.includes("आंबा") || lowerName.includes("hapus")) {
            plantName = "Mango (आंबा)";
        } else if (lowerName.includes("cashew") || lowerName.includes("काजू")) {
            plantName = "Cashew (काजू)";
        } else if (lowerName.includes("coconut") || lowerName.includes("नारळ")) {
            plantName = "Coconut (नारळ)";
        } else if (lowerName.includes("supari") || lowerName.includes("areca nut") || lowerName.includes("areca-nut") || lowerName.includes("सुपारी")) {
            plantName = "Supari (सुपारी - Areca Nut)";
        } else if (lowerName.includes("peru") || lowerName.includes("guava") || lowerName.includes("पेरू")) {
            plantName = "Peru (पेरू - Guava)";
        } else if (lowerName.includes("chiku") || lowerName.includes("sapota") || lowerName.includes("चिकू")) {
            plantName = "Chiku (चिकू)";
        } else if (lowerName.includes("aavla") || lowerName.includes("amla") || lowerName.includes("आवळा")) {
            plantName = "Aavla (आवळा)";
        } else if (lowerName.includes("limbu") || lowerName.includes("lemon") || lowerName.includes("लिंबू")) {
            plantName = "Limbu (लिंबू - Lemon)";
        } else if (lowerName.includes("jackfruit") || lowerName.includes("phanas") || lowerName.includes("फणस")) {
            plantName = "Jackfruit (फणस)";
        } else if (lowerName.includes("starfruit") || lowerName.includes("कारंबोला")) {
            plantName = "Starfruit (कारंबोला)";
        } else if (lowerName.includes("kokam") || lowerName.includes("कोकम")) {
            plantName = "Kokam (कोकम)";
        } else if (lowerName.includes("jaam") || lowerName.includes("rose apple") || lowerName.includes("जाम")) {
            plantName = "Jaam (जाम - Rose Apple)";
        } else if (lowerName.includes("jambhul") || lowerName.includes("jamun") || lowerName.includes("जांभूळ")) {
            plantName = "Jambhul (जांभूळ)";
        } else if (lowerName.includes("ramfal") || lowerName.includes("ramphal") || lowerName.includes("रामफळ")) {
            plantName = "Ramfal (रामफळ)";
        } else if (lowerName.includes("sitafal") || lowerName.includes("sitaphal") || lowerName.includes("सीताफळ")) {
            plantName = "Sitafal (सीताफळ)";
        } else if (lowerName.includes("avocado") || lowerName.includes("अॅव्होकॅडो")) {
            plantName = "Avocado (अॅव्होकॅडो)";
        } else if (lowerName.includes("santra") || lowerName.includes("orange") || lowerName.includes("संत्रा")) {
            plantName = "Santra (संत्रा - Orange)";
        } else if (lowerName.includes("mosambi") || lowerName.includes("मोसंबी")) {
            plantName = "Mosambi (मोसंबी)";
        } else if (lowerName.includes("tuti") || lowerName.includes("mulberry") || lowerName.includes("तुती")) {
            plantName = "Tuti (तुती - Mulberry)";
        } else if (lowerName.includes("rambutan") || lowerName.includes("रामबुतान")) {
            plantName = "Rambutan (रामबुतान)";
        } else if (lowerName.includes("lichi") || lowerName.includes("litchi") || lowerName.includes("लिची")) {
            plantName = "Lichi (लिची)";
        } else if (lowerName.includes("chinch") || lowerName.includes("tamarind") || lowerName.includes("चिंच")) {
            plantName = "Chinch (चिंच - Tamarind)";
        } else if (lowerName.includes("cherry") || lowerName.includes("चेरी")) {
            plantName = "Cherry (चेरी)";
        } else if (lowerName.includes("raiaavla") || lowerName.includes("रायआवळा")) {
            plantName = "Raiaavla (रायआवळा)";
        } else if (lowerName.includes("banana") || lowerName.includes("केळी")) {
            plantName = "Banana (केळी)";
        } else if (lowerName.includes("nilambi") || lowerName.includes("निळंबी")) {
            plantName = "Nilambi (निळंबी)";
        } else if (lowerName.includes("papnus") || lowerName.includes("pomelo") || lowerName.includes("पपनस")) {
            plantName = "Papnus (पपनस - Pomelo)";
        } else if (lowerName.includes("mangosteen") || lowerName.includes("मंगोस्टिन") || lowerName.includes("मंगोस्टीन")) {
            plantName = "Mangosteen (मंगोस्टिन)";
        } else if (lowerName.includes("karvand") || lowerName.includes("करवंद")) {
            plantName = "Karvand (करवंद)";
        } else if (lowerName.includes("shevga") || lowerName.includes("drumstick") || lowerName.includes("शेवगा")) {
            plantName = "Shevga (शेवगा - Drumstick)";
        } else if (lowerName.includes("papaya") || lowerName.includes("पपई")) {
            plantName = "Papaya (पपई)";
        } else if (lowerName.includes("coffee") || lowerName.includes("कॉफी")) {
            plantName = "Coffee (कॉफी)";
        } else if (lowerName.includes("jayfal") || lowerName.includes("nutmeg")) {
            plantName = "Jayfal";
        } else if (lowerName.includes("dalchini") || lowerName.includes("cinnamon")) {
            plantName = "Dalchini";
        } else if (lowerName.includes("lavang") || lowerName.includes("clove")) {
            plantName = "Lavang";
        } else if (lowerName.includes("kalimiri") || lowerName.includes("black pepper")) {
            plantName = "Kalimiri";
        } else if (lowerName.includes("allspice")) {
            plantName = "Allspice";
        } else if (lowerName.includes("tejpatta")) {
            plantName = "Tejpatta";
        } else if (lowerName.includes("velchi") || lowerName.includes("cardamom")) {
            plantName = "Velchi";
        } else if (lowerName.includes("halad") || lowerName.includes("turmeric")) {
            plantName = "Halad";
        } else if (lowerName.includes("kadipatta") || lowerName.includes("curry")) {
            plantName = "Kadipatta";
        } else if (lowerName.includes("money plant") || lowerName.includes("pothos")) {
            plantName = "Money plant";
        } else if (lowerName.includes("peace lily") || lowerName.includes("spathiphyllum")) {
            plantName = "Peace Lily";
        } else if (lowerName.includes("snake plant") || lowerName.includes("sansevieria")) {
            plantName = "Snake plant";
        } else if (lowerName.includes("rubber plant") || lowerName.includes("elastica")) {
            plantName = "Rubber plant";
        } else if (lowerName.includes("fiddle leaf") || lowerName.includes("lyrata")) {
            plantName = "Fiddle leaf fig";
        } else if (lowerName.includes("alocasia")) {
            plantName = "Alocasia";
        } else if (lowerName.includes("aglonema") || lowerName.includes("chinese evergreen")) {
            plantName = "Aglonema";
        } else if (lowerName.includes("jade") || lowerName.includes("crassula")) {
            plantName = "Jade";
        } else if (lowerName.includes("anthurium")) {
            plantName = "Anthurium";
        } else if (lowerName.includes("singonium") || lowerName.includes("syngonium")) {
            plantName = "Singonium";
        } else if (lowerName.includes("maranta") || lowerName.includes("prayer plant")) {
            plantName = "Maranta";
        } else if (lowerName.includes("diffenbachia") || lowerName.includes("dieffenbachia")) {
            plantName = "Diffenbachia";
        } else if (lowerName.includes("poinsettia") || lowerName.includes("poinsetta")) {
            plantName = "Poinsettia";
        } else if (lowerName.includes("redmacher") || lowerName.includes("china doll")) {
            plantName = "Redmacher";
        } else if (lowerName.includes("cactus")) {
            plantName = "Cactus";
        } else if (lowerName.includes("philodendron")) {
            plantName = "Philodendron";
        } else if (lowerName.includes("ribbon grass")) {
            plantName = "Ribbon grass";
        } else if (lowerName.includes("fern")) {
            plantName = "Fern";
        } else if (lowerName.includes("spider plant")) {
            plantName = "Spider plant";
        } else if (lowerName.includes("pepromia") || lowerName.includes("peperomia")) {
            plantName = "Pepromia";
        } else if (lowerName.includes("calanthia") || lowerName.includes("calathea")) {
            plantName = "Calanthia";
        } else if (lowerName.includes("fittronia") || lowerName.includes("fittonia")) {
            plantName = "Fittronia";
        } else if (lowerName.includes("bird of paradise")) {
            plantName = "Bird of paradise";
        } else if (lowerName.includes("broken heart") || lowerName.includes("swiss cheese") || lowerName.includes("monstera")) {
            plantName = "Broken heart";
        } else if (lowerName.includes("serrisa / snowrose hedge") || lowerName.includes("snowrose hedge")) {
            plantName = "Serrisa Hedge";
        } else if (lowerName.includes("serrisa") || lowerName.includes("serissa")) {
            plantName = "Serrisa";
        } else if (lowerName.includes("asperagus") || lowerName.includes("asparagus")) {
            plantName = "Asperagus";
        } else if (lowerName.includes("tulas") || lowerName.includes("tulsi")) {
            plantName = "Tulas";
        } else if (lowerName.includes("jaswand") || lowerName.includes("hibiscus")) {
            plantName = "Jaswand (जास्वंद - Hibiscus)";
        } else if (lowerName.includes("raphis") || lowerName.includes("rhapis") || lowerName.includes("lady palm")) {
            plantName = "Raphis Palm";
        } else if (lowerName.includes("areca red palm") || lowerName.includes("red areca palm") || lowerName.includes("red sealing wax")) {
            plantName = "Areca Red Palm";
        } else if (lowerName.includes("areca palm")) {
            plantName = "Areca Palm";
        } else if (lowerName.includes("fox tail palm") || lowerName.includes("foxtail palm")) {
            plantName = "Fox Tail Palm";
        } else if (lowerName.includes("bottle palm")) {
            plantName = "Bottle Palm";
        } else if (lowerName.includes("fan palm") || lowerName.includes("chinese fan")) {
            plantName = "Fan Palm";
        } else if (lowerName.includes("bismarkia") || lowerName.includes("bismarckia") || lowerName.includes("silver bismarck")) {
            plantName = "Bismarkia Palm";
        } else if (lowerName.includes("kadulimb") || lowerName.includes("neem")) {
            plantName = "Kadulimb";
        } else if (lowerName.includes("sarpagandha")) {
            plantName = "Sarpagandha";
        } else if (lowerName.includes("gavti")) {
            plantName = "Gavti chaha";
        } else if (lowerName.includes("pudina") || lowerName.includes("mint")) {
            plantName = "Pudina";
        } else if (lowerName.includes("bakul")) {
            plantName = "Bakul Shrub";
        // Hedge & Edge Plants
        } else if (lowerName.includes("acalipha") || lowerName.includes("copperleaf")) {
            plantName = "Acalipha";
        } else if (lowerName.includes("duranta") || lowerName.includes("golden dewdrop")) {
            plantName = "Duranta";
        } else if (lowerName.includes("bamboo grass")) {
            plantName = "Bamboo Grass";
        } else if (lowerName.includes("box wood") || lowerName.includes("boxwood")) {
            plantName = "Box wood";
        } else if (lowerName.includes("kupia / false heather") || lowerName.includes("false heather")) {
            plantName = "Kupia Hedge";
        } else if (lowerName.includes("lantena / lantana hedge") || lowerName.includes("lantana hedge")) {
            plantName = "Lantena Hedge";
        } else if (lowerName.includes("malpighia") || lowerName.includes("singapore holly")) {
            plantName = "Malpighia";
        } else if (lowerName.includes("phylunthus") || lowerName.includes("snow bush")) {
            plantName = "Phylunthus";
        } else if (lowerName.includes("boat lily") || lowerName.includes("moses")) {
            plantName = "Boat Lily";
        } else if (lowerName.includes("pendanus") || lowerName.includes("screw pine")) {
            plantName = "Pendanus";
        } else if (lowerName.includes("golden papua") || lowerName.includes("golden aralia")) {
            plantName = "Golden Papua";
        } else if (lowerName.includes("jatropha hedge") || lowerName.includes("peregrina")) {
            plantName = "Jatropha Hedge";
        // Creepers & Climbers
        } else if (lowerName.includes("madhumalti") || lowerName.includes("rangoon")) {
            plantName = "Madhumalti";
        } else if (lowerName.includes("gokarna") || lowerName.includes("butterfly pea")) {
            plantName = "Gokarna";
        } else if (lowerName.includes("bigonia") || lowerName.includes("flame vine")) {
            plantName = "Bigonia";
        } else if (lowerName.includes("lasun vel") || lowerName.includes("garlic vine")) {
            plantName = "Lasun Vel";
        } else if (lowerName.includes("krushna kamal") || lowerName.includes("passion flower")) {
            plantName = "Krushna Kamal";
        } else if (lowerName.includes("passion fruit")) {
            plantName = "Passion Fruit";
        } else if (lowerName.includes("icecream vel") || lowerName.includes("mandevilla")) {
            plantName = "Icecream Vel";
        } else if (lowerName.includes("badak vel") || lowerName.includes("dutchman")) {
            plantName = "Badak Vel";
        } else if (lowerName.includes("sankrant vel")) {
            plantName = "Sankrant Vel";
        } else if (lowerName.includes("thubergia") || lowerName.includes("thunbergia") || lowerName.includes("blue sky vine")) {
            plantName = "Thubergia";
        // Avenue Trees & Landscaping
        } else if (lowerName.includes("ashoka tree") || (lowerName.includes("ashoka") && !lowerName.includes("sita ashok"))) {
            plantName = "Ashoka";
        } else if (lowerName.includes("gulmohar") || lowerName.includes("royal poinciana")) {
            plantName = "Gulmohar";
        } else if (lowerName.includes("badam") || lowerName.includes("indian almond")) {
            plantName = "Badam";
        } else if (lowerName.includes("bahava") || lowerName.includes("golden shower") || lowerName.includes("amaltas")) {
            plantName = "Bahava";
        } else if (lowerName.includes("bakul tree") || lowerName.includes("spanish cherry") || lowerName.includes("bakul / spanish cherry")) {
            plantName = "Bakul Tree";
        } else if (lowerName.includes("bitti / yellow oleander") || lowerName.includes("yellow oleander")) {
            plantName = "Bitti Tree";
        } else if (lowerName.includes("bottle brush") || lowerName.includes("bottlebrush")) {
            plantName = "Bottle Brush Tree";
        } else if (lowerName.includes("buch") || lowerName.includes("indian cork tree") || lowerName.includes("akash neem")) {
            plantName = "Buch";
        } else if (lowerName.includes("kadamba")) {
            plantName = "Kadamba";
        } else if (lowerName.includes("kailashpati") || lowerName.includes("cannonball")) {
            plantName = "Kailashpati";
        } else if (lowerName.includes("kanchan") || lowerName.includes("orchid tree")) {
            plantName = "Kanchan Tree";
        } else if (lowerName.includes("muchkund") || lowerName.includes("dinner plate tree") || lowerName.includes("kanak champa")) {
            plantName = "Muchkund";
        } else if (lowerName.includes("neelmohar") || lowerName.includes("blue jacaranda") || lowerName.includes("jacaranda")) {
            plantName = "Neelmohar";
        } else if (lowerName.includes("peltophorum") || lowerName.includes("yellow flame")) {
            plantName = "Peltophorum";
        } else if (lowerName.includes("rain tree") || lowerName.includes("raintree")) {
            plantName = "Rain Tree";
        } else if (lowerName.includes("silver oak") || lowerName.includes("silveroak")) {
            plantName = "Silver Oak";
        } else if (lowerName.includes("spathodia") || lowerName.includes("african tulip")) {
            plantName = "Spathodia";
        } else if (lowerName.includes("samudra fal") || lowerName.includes("sea poison")) {
            plantName = "Samudra Fal";
        } else if (lowerName.includes("sitaranjan") || lowerName.includes("mast tree")) {
            plantName = "Sitaranjan";
        } else if (lowerName.includes("savar") || lowerName.includes("silk cotton") || lowerName.includes("semal")) {
            plantName = "Savar";
        } else if (lowerName.includes("shendari") || lowerName.includes("kamala tree")) {
            plantName = "Shendari";
        } else if (lowerName.includes("surangi")) {
            plantName = "Surangi";
        } else if (lowerName.includes("suru") || lowerName.includes("whistling pine") || lowerName.includes("casuarina")) {
            plantName = "Suru";
        } else if (lowerName.includes("tabubia") || lowerName.includes("pink trumpet") || lowerName.includes("pink poui")) {
            plantName = "Tabubia";
        } else if (lowerName.includes("sita ashok")) {
            plantName = "Sita Ashok Tree";
        } else if (lowerName.includes("cycus") || lowerName.includes("sago palm")) {
            plantName = "Cycus";
        } else if (lowerName.includes("xmas tree") || lowerName.includes("norfolk island pine") || lowerName.includes("christmas tree")) {
            plantName = "Xmas Tree";
        } else if (lowerName.includes("sheesham") || lowerName.includes("indian rosewood") || lowerName.includes("shisham")) {
            plantName = "Sheesham";
        } else if (lowerName.includes("kashid") || lowerName.includes("siamese cassia") || lowerName.includes("kassod")) {
            plantName = "Kashid";
        } else if (lowerName.includes("karanj") || lowerName.includes("pongamia")) {
            plantName = "Karanj";
        } else if (lowerName.includes("palas") || lowerName.includes("flame of the forest") || lowerName.includes("kesudo")) {
            plantName = "Palas";
        } else if (lowerName.includes("behda") || lowerName.includes("baheda") || lowerName.includes("bibhitaki")) {
            plantName = "Behda";
        } else if (lowerName.includes("neem / margosa") || lowerName.includes("margosa")) {
            plantName = "Neem Tree";
        } else if (lowerName.includes("pimpal") || lowerName.includes("sacred fig") || lowerName.includes("bodhi")) {
            plantName = "Pimpal";
        } else if (lowerName.includes("tamhan") || lowerName.includes("pride of india") || lowerName.includes("jarul")) {
            plantName = "Tamhan";
        }
        
        let enrichment = plantEnrichments[plantName];
        
        if (!enrichment) {
            const baseName = plantName.split('(')[0].split('-')[0].split('/')[0].trim();
            enrichment = plantEnrichments[baseName];
        }
        
        if (!enrichment) {
            const categoryDefaults = {
                fruits: {
                    scientific: "Fructus species",
                    image: "assets/real_nursery_1.jpg",
                    specs: { Sunlight: "Full Sun (6+ hrs)", Watering: "Moderate", Soil: "Well-drained Loam", Growth: "Moderate" },
                    care: "Apply organic manure twice a year. Water young saplings regularly but avoid waterlogging. Prune after harvest."
                },
                spices: {
                    scientific: "Aromatica species",
                    image: "assets/real_nursery_2.jpg",
                    specs: { Sunlight: "Partial Shade / Dappled Light", Watering: "Regular", Soil: "Humus-rich, Well-drained", Growth: "Medium" },
                    care: "Provide climbing support if needed. Mulch root zone to retain moisture. Enjoys humid conditions and regular misting."
                },
                palms: {
                    scientific: "Arecaceae species",
                    image: "assets/real_nursery_3.jpg",
                    specs: { Sunlight: "Bright Indirect Light", Watering: "Moderate", Soil: "Well-draining Sandy", Growth: "Slow to Moderate" },
                    care: "Keep soil lightly moist. Feed with slow-release fertilizer. Prune only dead brown fronds from the base."
                },
                flowering: {
                    scientific: "Floris species",
                    image: "assets/real_nursery_4.jpg",
                    specs: { Sunlight: "Full Sun to Dappled Shade", Watering: "Moderate to Regular", Soil: "Rich, Well-drained", Growth: "Moderate" },
                    care: "Prune faded flowers to promote new blooms. Feed with organic flower fertilizer monthly during the growing season."
                },
                indoor: {
                    scientific: "Domus species",
                    image: "assets/real_nursery_5.jpg",
                    specs: { Sunlight: "Indirect Light / Semi-Shade", Watering: "Low (When dry)", Soil: "Well-drained Potting Mix", Growth: "Slow to Medium" },
                    care: "Allow soil to dry between waterings. Wipe leaves to remove dust. Do not expose to direct hot afternoon sun."
                },
                hedge: {
                    scientific: "Sepimentum species",
                    image: "assets/real_nursery_1.jpg",
                    specs: { Sunlight: "Full Sun to Partial Shade", Watering: "Moderate", Soil: "Adaptable", Growth: "Fast" },
                    care: "Prune regularly to maintain shape and density. Water when topsoil is dry. Apply nitrogen-rich fertilizer in spring."
                },
                creepers: {
                    scientific: "Scandens species",
                    image: "assets/real_nursery_4.jpg",
                    specs: { Sunlight: "Full Sun to Partial Shade", Watering: "Regular", Soil: "Rich, Moist, Well-drained", Growth: "Fast" },
                    care: "Provide robust trellis or support structures. Prune annually after the flowering cycle to control spread."
                },
                avenue: {
                    scientific: "Arbor species",
                    image: "assets/real_nursery_1.jpg",
                    specs: { Sunlight: "Full Sun", Watering: "Low (Established)", Soil: "Hardy, Adaptable", Growth: "Fast" },
                    care: "Provide stakes for young saplings. Water regularly until established. Requires minimal maintenance once matured."
                },
                medicinal: {
                    scientific: "Medicinalis species",
                    image: "assets/tulsi.jpg",
                    specs: { Sunlight: "Full Sun to Dappled Shade", Watering: "Moderate", Soil: "Well-drained Sandy Loam", Growth: "Moderate" },
                    care: "Avoid chemical pesticides. Feed with organic compost only. Prune tips regularly to encourage bushy growth."
                }
            };
            
            enrichment = categoryDefaults[plant.category] || {
                scientific: "Plantae",
                image: "assets/real_nursery_1.jpg",
                specs: { Sunlight: "Full Sun to Partial Shade", Watering: "Moderate", Soil: "Well-drained", Growth: "Moderate" },
                care: "Water when the topsoil feels dry. Provide organic compost twice a year. Prune dead foliage as needed."
            };
        }
        
        return {
            name: plant.name,
            category: plant.category,
            varieties: plant.varieties || [],
            desc: plant.desc || "Healthy and locally adapted sapling from Priya Nursery.",
            scientificName: enrichment.scientific,
            image: enrichment.image,
            specs: enrichment.specs,
            care: enrichment.care
        };
    }

    // DOM Elements for Catalog
    const categorySectionsWrapper = document.getElementById('category-sections-wrapper');
    const categoryDetailView = document.getElementById('category-detail-view');
    const categoryDetailTitle = document.getElementById('category-detail-title');
    const categoryDetailDesc = document.getElementById('category-detail-desc');
    const categoryDetailGrid = document.getElementById('category-detail-grid');
    const btnBackToCategories = document.getElementById('btn-back-to-categories');
    const catalogSection = document.getElementById('catalog');

    // Modal Elements
    const plantDetailsModal = document.getElementById('plant-details-modal');
    const modalPlantImg = document.getElementById('modal-plant-img');
    const modalPlantCategory = document.getElementById('modal-plant-category');
    const modalPlantName = document.getElementById('modal-plant-name');
    const modalPlantScientific = document.getElementById('modal-plant-scientific');
    const modalPlantDesc = document.getElementById('modal-plant-desc');
    const modalSpecsGrid = document.getElementById('modal-specs-grid');
    const modalPlantCare = document.getElementById('modal-plant-care');
    const modalWhatsappBtn = document.getElementById('modal-whatsapp-btn');
    const modalCloseBtn = document.getElementById('btn-close-modal');
    const modalBackBtn = document.getElementById('modal-back-btn');

    // Create Plant Card
    const createPlantCard = (plant) => {
        const card = document.createElement('div');
        card.className = 'plant-card card-hover-effect';
        
        const categoryLabels = {
            fruits: 'Fruit Plant',
            spices: 'Spice Plant',
            palms: 'Palm',
            flowering: 'Flowering Plant',
            indoor: 'Indoor Plant',
            hedge: 'Edge & Hedge',
            creepers: 'Creeper / Climber',
            avenue: 'Avenue Tree',
            medicinal: 'Medicinal Plant'
        };
        const label = categoryLabels[plant.category] || 'Plant';
        
        const categoryFallbacks = {
            fruits: 'assets/real_nursery_1.jpg',
            spices: 'assets/real_nursery_2.jpg',
            palms: 'assets/real_nursery_3.jpg',
            flowering: 'assets/real_nursery_4.jpg',
            indoor: 'assets/real_nursery_5.jpg',
            hedge: 'assets/real_nursery_1.jpg',
            creepers: 'assets/real_nursery_4.jpg',
            avenue: 'assets/real_nursery_1.jpg',
            medicinal: 'assets/tulsi.jpg'
        };
        const fallbackSrc = categoryFallbacks[plant.category] || 'assets/real_nursery_1.jpg';
        
        let varietiesTag = '';
        if (plant.varieties && plant.varieties.length > 0) {
            varietiesTag = `<span class="card-varieties-tag">${plant.varieties.length} Varieties</span>`;
        }
        
        card.innerHTML = `
            <div class="plant-card-img-wrapper">
                <div class="plant-card-header">
                    <span class="plant-category-badge badge-${plant.category}">${label}</span>
                </div>
                <img src="${plant.image}" alt="${plant.name}" class="plant-card-img" loading="lazy" onerror="if(this.src.includes('assets/')){this.src=this.src.replace('assets/','');}else{this.onerror=null;this.src='${fallbackSrc}';}">
            </div>
            <div class="plant-card-body">
                <h3>${plant.name}</h3>
                <span class="plant-scientific">${plant.scientificName}</span>
                <p class="plant-card-desc">${plant.desc}</p>
                ${varietiesTag}
            </div>
        `;
        
        // Add click event to open details
        card.addEventListener('click', () => {
            openPlantDetails(plant);
        });
        
        return card;
    };

    // Render Homepage Catalog (First 4 of each)
    const renderHomepageCatalog = () => {
        if (!categorySectionsWrapper) return;
        categorySectionsWrapper.innerHTML = '';
        
        // Group plants by category
        const grouped = {};
        plantCatalog.forEach(plant => {
            const enriched = getEnrichedPlant(plant);
            if (!grouped[plant.category]) {
                grouped[plant.category] = [];
            }
            grouped[plant.category].push(enriched);
        });

        // Loop through each category in our metadata
        const categoryKeys = ['fruits', 'spices', 'palms', 'flowering', 'indoor', 'hedge', 'creepers', 'avenue', 'medicinal'];
        
        categoryKeys.forEach(catKey => {
            const catData = categories[catKey];
            const plants = grouped[catKey] || [];
            if (plants.length === 0) return;
            
            // Slice the first 4 plants as featured
            const featuredPlants = plants.slice(0, 4);
            
            // Create category section block
            const block = document.createElement('div');
            block.className = 'category-block';
            
            // Header with Title and "View All" button
            block.innerHTML = `
                <div class="category-block-header">
                    <h3 class="category-block-title">${catData.title}</h3>
                    <button class="btn-view-all" data-category="${catKey}">
                        View All (${plants.length})
                        <svg viewBox="0 0 24 24" style="width:1.25rem; height:1.25rem; fill:currentColor; margin-left:4px; vertical-align:middle;"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
                    </button>
                </div>
            `;
            
            // Grid of cards
            const grid = document.createElement('div');
            grid.className = 'catalog-grid category-block-grid-scroll';
            
            featuredPlants.forEach(plant => {
                const card = createPlantCard(plant);
                grid.appendChild(card);
            });
            
            block.appendChild(grid);
            categorySectionsWrapper.appendChild(block);
        });

        // Add event listeners to "View All" buttons
        const viewAllButtons = categorySectionsWrapper.querySelectorAll('.btn-view-all');
        viewAllButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const catKey = btn.getAttribute('data-category');
                openCategoryView(catKey);
            });
        });
    };

    // Open Category View (shows all plants in a category)
    const openCategoryView = (catKey) => {
        const catData = categories[catKey];
        if (!catData) return;
        
        // Group and filter plants
        const categoryPlants = plantCatalog.filter(plant => plant.category === catKey).map(getEnrichedPlant);
        
        categoryDetailTitle.textContent = catData.title;
        categoryDetailDesc.textContent = catData.desc;
        
        categoryDetailGrid.innerHTML = '';
        categoryPlants.forEach(plant => {
            const card = createPlantCard(plant);
            categoryDetailGrid.appendChild(card);
        });
        
        // Hide main catalog list
        catalogSection.classList.add('hidden');
        // Show detail view
        categoryDetailView.classList.remove('hidden');
        
        // Smooth scroll to top of section
        categoryDetailView.scrollIntoView({ behavior: 'smooth' });
    };

    // Close Category View
    const closeCategoryView = () => {
        categoryDetailView.classList.add('hidden');
        catalogSection.classList.remove('hidden');
        catalogSection.scrollIntoView({ behavior: 'smooth' });
    };

    // Open Plant Details Modal
    const openPlantDetails = (plant) => {
        const categoryFallbacks = {
            fruits: 'assets/real_nursery_1.jpg',
            spices: 'assets/real_nursery_2.jpg',
            palms: 'assets/real_nursery_3.jpg',
            flowering: 'assets/real_nursery_4.jpg',
            indoor: 'assets/real_nursery_5.jpg',
            hedge: 'assets/real_nursery_1.jpg',
            creepers: 'assets/real_nursery_4.jpg',
            avenue: 'assets/real_nursery_1.jpg',
            medicinal: 'assets/tulsi.jpg'
        };
        const fallbackSrc = categoryFallbacks[plant.category] || 'assets/real_nursery_1.jpg';
        
        modalPlantImg.src = plant.image;
        modalPlantImg.onerror = function() {
            if (this.src.includes('assets/')) {
                this.src = this.src.replace('assets/', '');
            } else {
                this.onerror = null;
                this.src = fallbackSrc;
            }
        };
        modalPlantImg.alt = plant.name;
        
        const categoryLabels = {
            fruits: 'Fruit Plant',
            spices: 'Spice Plant',
            palms: 'Palm',
            flowering: 'Flowering Plant',
            indoor: 'Indoor Plant',
            hedge: 'Edge & Hedge',
            creepers: 'Creeper / Climber',
            avenue: 'Avenue Tree',
            medicinal: 'Medicinal Plant'
        };
        const label = categoryLabels[plant.category] || 'Plant';
        
        modalPlantCategory.textContent = label;
        modalPlantCategory.className = `plant-category-badge badge-${plant.category}`;
        
        modalPlantName.textContent = plant.name;
        modalPlantScientific.textContent = plant.scientificName;
        modalPlantDesc.textContent = plant.desc;
        
        // Render specs
        modalSpecsGrid.innerHTML = '';
        if (plant.specs) {
            for (const key in plant.specs) {
                if (plant.specs.hasOwnProperty(key)) {
                    const specItem = document.createElement('div');
                    specItem.className = 'spec-item';
                    specItem.innerHTML = `
                        <span class="spec-label">${key}</span>
                        <span class="spec-value">${plant.specs[key]}</span>
                    `;
                    modalSpecsGrid.appendChild(specItem);
                }
            }
        }
        
        // Render care
        modalPlantCare.textContent = plant.care || "Regular watering and organic compost twice a year.";
        
        // Varieties dropdown in modal if varieties exist
        const modalInfoPane = document.querySelector('.modal-info-pane');
        const existingVarieties = modalInfoPane.querySelector('.modal-varieties-container');
        if (existingVarieties) {
            existingVarieties.remove();
        }
        
        let selectedVariety = '';
        if (plant.varieties && plant.varieties.length > 0) {
            const container = document.createElement('div');
            container.className = 'modal-varieties-container';
            container.style.marginTop = '1rem';
            
            const labelEl = document.createElement('label');
            labelEl.textContent = "Select Variety:";
            labelEl.style.display = 'block';
            labelEl.style.fontSize = '0.85rem';
            labelEl.style.fontWeight = '600';
            labelEl.style.marginBottom = '0.5rem';
            
            const select = document.createElement('select');
            select.className = 'variety-select';
            select.style.padding = '0.6rem';
            select.innerHTML = `<option value="">-- Choose Variety --</option>` + 
                plant.varieties.map(v => `<option value="${v}">${v}</option>`).join('');
                
            select.addEventListener('change', (e) => {
                selectedVariety = e.target.value;
                updateWhatsappBtn();
            });
            
            container.appendChild(labelEl);
            container.appendChild(select);
            
            // Insert before the actions section
            const actions = modalInfoPane.querySelector('.modal-actions');
            modalInfoPane.insertBefore(container, actions);
        }
        
        const updateWhatsappBtn = () => {
            let varietyText = "";
            if (selectedVariety) {
                varietyText = ` (*Variety:* ${selectedVariety})`;
            }
            const waText = encodeURIComponent(`Hi Priya Nursery, I am interested in inquiring about the availability of: *${plant.name}*${varietyText} from your online catalog.`);
            modalWhatsappBtn.href = `https://wa.me/917498486833?text=${waText}`;
        };
        
        updateWhatsappBtn();
        
        plantDetailsModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Disable background scrolling
    };

    // Close Plant Details Modal
    const closePlantDetails = () => {
        plantDetailsModal.classList.add('hidden');
        document.body.style.overflow = ''; // Enable background scrolling
    };

    // Wire up events
    if (btnBackToCategories) {
        btnBackToCategories.addEventListener('click', closeCategoryView);
    }
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closePlantDetails);
    }
    if (modalBackBtn) {
        modalBackBtn.addEventListener('click', closePlantDetails);
    }
    if (plantDetailsModal) {
        plantDetailsModal.addEventListener('click', (e) => {
            if (e.target === plantDetailsModal) {
                closePlantDetails();
            }
        });
    }

    // Close modal on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closePlantDetails();
            closeCategoryView();
        }
    });

    // Run Initial Catalog
    if (categorySectionsWrapper) {
        renderHomepageCatalog();
    }
});
