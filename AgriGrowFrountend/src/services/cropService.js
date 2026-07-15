// Crop Database & Agricultural Knowledge Base

export const cropsData = [
  {
    id: "rice",
    name: "Rice (Paddy)",
    type: "Cereal",
    season: "Kharif",
    optimalTemp: "21°C - 37°C",
    waterNeeds: "High (1200 - 1500 mm)",
    soilPh: "5.5 - 6.5",
    fertilizerNPK: { N: 120, P: 60, K: 40 }, // in kg/hectare
    seedRate: 40, // kg/hectare
    germinationRate: 0.85,
    purity: 0.98,
    spacing: "20cm x 15cm",
    duration: "120 - 150 days",
    image: "🌾",
    description: "Rice is the staple food of more than half of the world's population. It requires high temperature, high humidity, and abundant rainfall or assured irrigation.",
    stages: ["Sowing & Nursery", "Tillering", "Panicle Initiation", "Flowering", "Harvesting"]
  },
  {
    id: "wheat",
    name: "Wheat",
    type: "Cereal",
    season: "Rabi",
    optimalTemp: "15°C - 25°C",
    waterNeeds: "Medium (450 - 650 mm)",
    soilPh: "6.0 - 7.5",
    fertilizerNPK: { N: 120, P: 50, K: 40 },
    seedRate: 100,
    germinationRate: 0.90,
    purity: 0.99,
    spacing: "22.5cm x 10cm",
    duration: "110 - 140 days",
    image: "🌾",
    description: "Wheat is a Rabi crop requiring cool weather during growing and warm, sunny weather for ripening. It grows best in well-drained loamy soils.",
    stages: ["Sowing", "Crown Root Initiation", "Tillering", "Jointing", "Heading", "Maturity"]
  },
  {
    id: "corn",
    name: "Corn (Maize)",
    type: "Cereal",
    season: "Kharif",
    optimalTemp: "18°C - 27°C",
    waterNeeds: "Medium (500 - 800 mm)",
    soilPh: "5.8 - 7.0",
    fertilizerNPK: { N: 150, P: 60, K: 40 },
    seedRate: 20,
    germinationRate: 0.88,
    purity: 0.97,
    spacing: "60cm x 20cm",
    duration: "90 - 120 days",
    image: "🌽",
    description: "Maize is known as the queen of cereals due to its high genetic yield potential. It thrives in well-drained fertile soils and requires moderate moisture.",
    stages: ["Sowing", "Vegetative growth", "Tasseling", "Silking", "Milk stage", "Maturity"]
  },
  {
    id: "tomato",
    name: "Tomato",
    type: "Vegetable",
    season: "Zaid",
    optimalTemp: "20°C - 28°C",
    waterNeeds: "Medium (600 - 800 mm)",
    soilPh: "6.0 - 6.8",
    fertilizerNPK: { N: 100, P: 80, K: 100 },
    seedRate: 0.4, // Nursery transplanted (400g/hectare)
    germinationRate: 0.80,
    purity: 0.95,
    spacing: "60cm x 45cm",
    duration: "90 - 110 days",
    image: "🍅",
    description: "Tomato is a warm-season vegetable crop sensitive to frost and waterlogging. Regular irrigation and staking support enhance yield quality.",
    stages: ["Nursery Sowing", "Transplantation", "Flowering", "Fruit Set", "Ripening & Harvesting"]
  },
  {
    id: "potato",
    name: "Potato",
    type: "Vegetable",
    season: "Rabi",
    optimalTemp: "15°C - 20°C",
    waterNeeds: "Medium (500 - 700 mm)",
    soilPh: "5.2 - 6.4",
    fertilizerNPK: { N: 150, P: 100, K: 120 },
    seedRate: 1500, // Seed tubers in kg/hectare
    germinationRate: 0.95,
    purity: 0.98,
    spacing: "60cm x 20cm",
    duration: "90 - 120 days",
    image: "🥔",
    description: "Potato is a tuber crop requiring cool temperature and loose, well-aerated sandy loam soils with slightly acidic pH to prevent scab disease.",
    stages: ["Sprouting", "Vegetative Growth", "Tuber Initiation", "Tuber Bulking", "Maturation"]
  },
  {
    id: "cotton",
    name: "Cotton",
    type: "Fiber",
    season: "Kharif",
    optimalTemp: "21°C - 30°C",
    waterNeeds: "Medium-High (700 - 1100 mm)",
    soilPh: "6.0 - 8.0",
    fertilizerNPK: { N: 100, P: 50, K: 50 },
    seedRate: 15,
    germinationRate: 0.75,
    purity: 0.96,
    spacing: "90cm x 45cm",
    duration: "150 - 180 days",
    image: "☁️",
    description: "Cotton is a major cash crop. It needs a long frost-free period, high temperature, and moderate rainfall during initial stages followed by sunny dry weather for boll opening.",
    stages: ["Sowing", "Seedling", "Squaring", "Flowering", "Boll Development", "Boll Bursting"]
  },
  {
    id: "soybean",
    name: "Soybean",
    type: "Oilseed",
    season: "Kharif",
    optimalTemp: "20°C - 30°C",
    waterNeeds: "Medium (450 - 700 mm)",
    soilPh: "6.0 - 6.5",
    fertilizerNPK: { N: 30, P: 80, K: 40 }, // Nitrogen-fixing, needs less N
    seedRate: 75,
    germinationRate: 0.85,
    purity: 0.97,
    spacing: "45cm x 10cm",
    duration: "100 - 120 days",
    image: "🫘",
    description: "Soybean is a legume species rich in protein and oil content. It fixes atmospheric nitrogen through root nodule symbiosis.",
    stages: ["Emergence", "Vegetative Growth", "Flowering", "Pod Development", "Seed Bulking", "Harvest"]
  },
  {
    id: "onion",
    name: "Onion",
    type: "Vegetable",
    season: "Rabi",
    optimalTemp: "13°C - 24°C",
    waterNeeds: "Medium (400 - 600 mm)",
    soilPh: "6.0 - 7.0",
    fertilizerNPK: { N: 100, P: 50, K: 80 },
    seedRate: 10,
    germinationRate: 0.82,
    purity: 0.95,
    spacing: "15cm x 10cm",
    duration: "120 - 140 days",
    image: "🧅",
    description: "Onion is a bulb crop requiring cool conditions in the early stages and warm, dry weather for bulb development and maturity.",
    stages: ["Nursery Sowing", "Transplantation", "Active Vegetative", "Bulb Initiation", "Bulb Development", "Harvest"]
  }
];

export const farmingGuides = [
  {
    title: "Organic Pest Management",
    category: "Pest Control",
    readTime: "5 min read",
    summary: "How to use natural predators, neem oil, and crop rotation to combat insects without chemical pesticides.",
    steps: [
      "Encourage beneficial insects like ladybugs and lacewings which eat aphids.",
      "Spray organic Neem Oil solutions (1-2% concentration) to disrupt insect reproductive cycles.",
      "Use yellow sticky traps to capture whiteflies and leaf miners.",
      "Rotate crops annually with nitrogen-fixing plants to break pest breeding patterns."
    ]
  },
  {
    title: "Soil Enrichment & Composting",
    category: "Soil Health",
    readTime: "6 min read",
    summary: "Secrets to building fertile, rich topsoil using vermicompost, cover crops, and organic mulches.",
    steps: [
      "Prepare a composting bin mixing 60% brown matter (dried leaves, straw) and 40% green matter (vegetable peels, green grass).",
      "Introduce red wiggler earthworms for high-grade vermicomposting.",
      "Grow cover crops like clover or alfalfa during fallow seasons to prevent soil erosion and fix nitrogen.",
      "Apply 2 inches of leaf mulch or wood chips to conserve soil moisture and encourage mycelial growth."
    ]
  },
  {
    title: "Smart Water Conservation Techniques",
    category: "Irrigation",
    readTime: "4 min read",
    summary: "Maximize your crop yield while reducing water usage by up to 50% with drip lines and sensor technology.",
    steps: [
      "Install sub-surface drip irrigation to deliver water directly to crop root zones.",
      "Integrate basic soil moisture sensors to avoid over-watering during cloudy periods.",
      "Irrigate crops in early mornings or late evenings to minimize evaporation losses.",
      "Create rainwater harvesting channels to feed farm storage ponds."
    ]
  },
  {
    title: "Harvesting and Post-Harvest Logistics",
    category: "Logistics",
    readTime: "7 min read",
    summary: "Prevent storage losses by learning the exact moisture limits and curing processes for commercial grains and crops.",
    steps: [
      "Measure grain moisture content before harvest (e.g. wheat should be below 14% moisture).",
      "Air-cure garlic, onions, and root crops in shaded, well-ventilated areas to toughen outer skins.",
      "Sort harvested products to remove damaged items before cold storage to prevent rot transmission.",
      "Maintain strict temperature guidelines in cold rooms (e.g. 0°C to 4°C for leafy greens, 10°C to 15°C for tomatoes)."
    ]
  }
];

export const diseasesCatalog = [
  {
    name: "Early Blight",
    crop: "Tomato & Potato",
    pathogen: "Alternaria solani (Fungus)",
    symptoms: "Circular dark spots with concentric 'target' rings on older leaves, yellowing of surrounding tissues, and eventual defoliation.",
    treatment: "Apply organic copper fungicides, prune lower leaves to improve airflow, rotate crops, and avoid overhead watering."
  },
  {
    name: "Stem Rust",
    crop: "Wheat",
    pathogen: "Puccinia graminis (Fungus)",
    symptoms: "Elongated, reddish-brown pustules on stems and leaves that turn black as the crop matures, causing shriveled grains.",
    treatment: "Plant rust-resistant cultivars, eliminate barberry bushes (alternate host), and apply systemic fungicides early in the season."
  },
  {
    name: "Boll Rot",
    crop: "Cotton",
    pathogen: "Fungal/Bacterial complex",
    symptoms: "Water-soaked lesions on bolls, bolls turning black, opening prematurely or failing to open, fiber discoloration.",
    treatment: "Optimize plant density to lower humidity in the canopy, apply balanced nitrogen, and spray neem oil or copper oxychloride."
  },
  {
    name: "Blast Disease",
    crop: "Rice",
    pathogen: "Magnaporthe oryzae (Fungus)",
    symptoms: "Spindle-shaped spots with gray centers on leaves, brown lesions on collars, neck rot causing panicles to fall over.",
    treatment: "Avoid excessive nitrogen application, maintain consistent water levels in paddy fields, and use certified pathogen-free seeds."
  }
];

export const governmentSchemes = [
  {
    name: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
    description: "An initiative by the Government of India that provides an income support of ₹6,000 per year in three equal installments to all landholding farmer families.",
    eligibility: { minArea: 0, maxArea: 10, category: "Small & Marginal Farmers" },
    benefits: "Direct bank transfer of ₹6,000 annually for seed and fertilizer purchasing support."
  },
  {
    name: "PM Fasal Bima Yojana (Crop Insurance)",
    description: "Yield-based insurance scheme offering safety net coverage against crop losses from sowing to post-harvest periods due to natural calamities.",
    eligibility: { minArea: 0.1, maxArea: 50, category: "All Farmers" },
    benefits: "Very low premiums (1.5% - 2% for food crops, 5% for horticultural crops) with full sum coverage."
  },
  {
    name: "Sub-Mission on Agricultural Mechanization",
    description: "Financial assistance program supporting the purchase of high-cost modern machinery (tractors, tillers, laser levelers, drones) to improve farm productivity.",
    eligibility: { minArea: 1.0, maxArea: 20, category: "Individual & Cooperative Farms" },
    benefits: "40% to 50% capital subsidy on qualifying farming equipment."
  },
  {
    name: "Paramparagat Krishi Vikas Yojana (PKVY)",
    description: "Organic farming cluster promotion scheme to support certification, soil health development, and chemical-free agricultural marketing.",
    eligibility: { minArea: 0.5, maxArea: 5, category: "Organic Clusters" },
    benefits: "₹50,000 per hectare financial assistance over 3 years for inputs and certification."
  }
];
