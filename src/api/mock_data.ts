import { QuestionSpec } from "../types";

export const MOCK_USER_DATA = {
    id: '3213', 
    email: 'pedroscocco@gmail.com', 
    totalSessions: 123, 
    currentStreak: 123, 
    accuracyPercentage: 87.5
}

export const MOCK_QUESTION_STEPS: {steps: QuestionSpec[]} = {
  "steps": [
    {
      "index": 0,
      "title": "Historical Period",
      "heading": "In which century did the Renaissance primarily occur?",
      "description": "The Renaissance was a period of cultural rebirth in Europe, marked by renewed interest in art, science, and classical learning.",
      "questionData": {
        "questionType": "mcq",
        "options": [
          {"option": "13th-14th centuries"},
          {"option": "14th-17th centuries"},
          {"option": "16th-18th centuries"},
          {"option": "18th-19th centuries"}
        ],
        "correctAnswer": "14th-17th centuries",
        "categories": null,
        "correct_answer_mapping": null
      }
    },
    {
      "index": 1,
      "title": "Geography",
      "heading": "What is the capital of Australia?",
      "description": "Australia's capital is often confused with its largest cities, but it's actually a planned city built specifically to serve as the capital.",
      "questionData": {
        "questionType": "sort",
        "options": [
          {"option": "Sydney"},
          {"option": "Melbourne"},
          {"option": "Canberra"},
          {"option": "Perth"}
        ],
        "correctAnswer": "Categorize by animal",
        "categories": ["Coala", "Canguru", "Lizard", "Emu"],
        "correct_answer_mapping": {
          "Coala": ["Canberra"],
          "Canguru": ["Sydney"],
          "Lizard": ["Perth"],
          "Emu": ["Melbourne"]
        }
      }
    },
    {
      "index": 2,
      "title": "Science",
      "heading": "What is the chemical symbol for gold?",
      "description": "Chemical symbols often derive from Latin names rather than English names of elements.",
      "questionData": {
        "questionType": "mcq",
        "options": [
          {"option": "Go"},
          {"option": "Gd"},
          {"option": "Au"},
          {"option": "Ag"}
        ],
        "correctAnswer": "Au",
        "categories": null,
        "correct_answer_mapping": null
      }
    },
    {
      "index": 3,
      "title": "Literature",
      "heading": "Who wrote the novel '1984'?",
      "description": "This dystopian novel has become synonymous with themes of surveillance and totalitarian government control.",
      "questionData": {
        "questionType": "mcq",
        "options": [
          {"option": "Aldous Huxley"},
          {"option": "George Orwell"},
          {"option": "Ray Bradbury"},
          {"option": "H.G. Wells"}
        ],
        "correctAnswer": "George Orwell",
        "categories": null,
        "correct_answer_mapping": null
      }
    },
    {
      "index": 4,
      "title": "Music",
      "heading": "How many strings does a standard guitar have?",
      "description": "The modern guitar design has been standardized for centuries, though variations exist for different musical styles.",
      "questionData": {
        "questionType": "mcq",
        "options": [
          {"option": "4"},
          {"option": "5"},
          {"option": "6"},
          {"option": "7"}
        ],
        "correctAnswer": "6",
        "categories": null,
        "correct_answer_mapping": null
      }
    },
    {
      "index": 5,
      "title": "Mathematics",
      "heading": "What is the value of π (pi) to two decimal places?",
      "description": "Pi is a mathematical constant representing the ratio of a circle's circumference to its diameter.",
      "questionData": {
        "questionType": "mcq",
        "options": [
          {"option": "3.12"},
          {"option": "3.14"},
          {"option": "3.16"},
          {"option": "3.18"}
        ],
        "correctAnswer": "3.14",
        "categories": null,
        "correct_answer_mapping": null
      }
    },
    {
      "index": 6,
      "title": "Sports",
      "heading": "In which sport would you perform a slam dunk?",
      "description": "This athletic move involves forcefully putting the ball through the hoop from above the rim.",
      "questionData": {
        "questionType": "mcq",
        "options": [
          {"option": "Tennis"},
          {"option": "Basketball"},
          {"option": "Volleyball"},
          {"option": "Football"}
        ],
        "correctAnswer": "Basketball",
        "categories": null,
        "correct_answer_mapping": null
      }
    },
    {
      "index": 7,
      "title": "Animals",
      "heading": "Which animal is known as the 'King of the Jungle'?",
      "description": "Despite the nickname, this animal actually primarily lives in grasslands and savannas rather than jungles.",
      "questionData": {
        "questionType": "mcq",
        "options": [
          {"option": "Tiger"},
          {"option": "Lion"},
          {"option": "Elephant"},
          {"option": "Gorilla"}
        ],
        "correctAnswer": "Lion",
        "categories": null,
        "correct_answer_mapping": null
      }
    },
    {
      "index": 8,
      "title": "Food Categories",
      "heading": "Categorize this food item by its primary nutritional component.",
      "description": "Understanding food categories helps in making balanced dietary choices and meal planning.",
      "questionData": {
        "questionType": "sort",
        "options": [
          {"option": "Chicken breast"}
        ],
        "correctAnswer": "Categorize by primary macronutrient",
        "categories": ["Primarily Protein", "Primarily Carbohydrate"],
        "correct_answer_mapping": {
          "Primarily Protein": ["Chicken breast"],
          "Primarily Carbohydrate": []
        }
      }
    },
    {
      "index": 9,
      "title": "Technology",
      "heading": "What does 'WWW' stand for?",
      "description": "This acronym represents the system of interlinked hypertext documents accessed via the Internet.",
      "questionData": {
        "questionType": "mcq",
        "options": [
          {"option": "World Wide Web"},
          {"option": "World Wild West"},
          {"option": "World War Won"},
          {"option": "World Wide Watch"}
        ],
        "correctAnswer": "World Wide Web",
        "categories": null,
        "correct_answer_mapping": null
      }
    },
    {
      "index": 10,
      "title": "Astronomy",
      "heading": "Which planet is closest to the Sun?",
      "description": "The solar system's planets are arranged in order of distance from our central star.",
      "questionData": {
        "questionType": "mcq",
        "options": [
          {"option": "Venus"},
          {"option": "Mercury"},
          {"option": "Earth"},
          {"option": "Mars"}
        ],
        "correctAnswer": "Mercury",
        "categories": null,
        "correct_answer_mapping": null
      }
    },
    {
      "index": 11,
      "title": "Art",
      "heading": "Who painted the Mona Lisa?",
      "description": "This Renaissance masterpiece is housed in the Louvre Museum and is famous for its subject's enigmatic smile.",
      "questionData": {
        "questionType": "mcq",
        "options": [
          {"option": "Michelangelo"},
          {"option": "Leonardo da Vinci"},
          {"option": "Raphael"},
          {"option": "Donatello"}
        ],
        "correctAnswer": "Leonardo da Vinci",
        "categories": null,
        "correct_answer_mapping": null
      }
    },
    {
      "index": 12,
      "title": "Chemistry",
      "heading": "What is the most abundant gas in Earth's atmosphere?",
      "description": "Earth's atmosphere consists of several gases in different proportions, with one making up the majority.",
      "questionData": {
        "questionType": "mcq",
        "options": [
          {"option": "Oxygen"},
          {"option": "Carbon dioxide"},
          {"option": "Nitrogen"},
          {"option": "Hydrogen"}
        ],
        "correctAnswer": "Nitrogen",
        "categories": null,
        "correct_answer_mapping": null
      }
    },
    {
      "index": 13,
      "title": "World Wars",
      "heading": "In which year did World War II end?",
      "description": "World War II concluded with the surrender of Japan following significant events in the Pacific theater.",
      "questionData": {
        "questionType": "mcq",
        "options": [
          {"option": "1944"},
          {"option": "1945"},
          {"option": "1946"},
          {"option": "1947"}
        ],
        "correctAnswer": "1945",
        "categories": null,
        "correct_answer_mapping": null
      }
    },
    {
      "index": 14,
      "title": "Currency",
      "heading": "What is the currency of Japan?",
      "description": "Different countries have their own monetary systems and currency names, often reflecting cultural or historical significance.",
      "questionData": {
        "questionType": "mcq",
        "options": [
          {"option": "Yuan"},
          {"option": "Won"},
          {"option": "Yen"},
          {"option": "Rupiah"}
        ],
        "correctAnswer": "Yen",
        "categories": null,
        "correct_answer_mapping": null
      }
    },
    {
      "index": 15,
      "title": "Human Body",
      "heading": "How many bones are in an adult human body?",
      "description": "The human skeletal system provides structure and protection for organs, with the number of bones changing from infancy to adulthood.",
      "questionData": {
        "questionType": "mcq",
        "options": [
          {"option": "196"},
          {"option": "206"},
          {"option": "216"},
          {"option": "226"}
        ],
        "correctAnswer": "206",
        "categories": null,
        "correct_answer_mapping": null
      }
    },
    {
      "index": 16,
      "title": "Ocean Depth",
      "heading": "What is the deepest point in Earth's oceans?",
      "description": "Ocean trenches represent the deepest parts of our planet's surface, formed by tectonic plate movements.",
      "questionData": {
        "questionType": "mcq",
        "options": [
          {"option": "Puerto Rico Trench"},
          {"option": "Mariana Trench"},
          {"option": "Japan Trench"},
          {"option": "Peru-Chile Trench"}
        ],
        "correctAnswer": "Mariana Trench",
        "categories": null,
        "correct_answer_mapping": null
      }
    },
    {
      "index": 17,
      "title": "Language Origins",
      "heading": "Categorize this word by its language of origin.",
      "description": "Many English words derive from other languages, reflecting historical influences and cultural exchanges.",
      "questionData": {
        "questionType": "sort",
        "options": [
          {"option": "Kindergarten"}
        ],
        "correctAnswer": "Categorize by language origin",
        "categories": ["German Origin", "French Origin"],
        "correct_answer_mapping": {
          "German Origin": ["Kindergarten"],
          "French Origin": []
        }
      }
    },
    {
      "index": 18,
      "title": "Inventions",
      "heading": "Who invented the telephone?",
      "description": "This communication device revolutionized long-distance conversation and laid the foundation for modern telecommunications.",
      "questionData": {
        "questionType": "mcq",
        "options": [
          {"option": "Thomas Edison"},
          {"option": "Alexander Graham Bell"},
          {"option": "Nikola Tesla"},
          {"option": "Guglielmo Marconi"}
        ],
        "correctAnswer": "Alexander Graham Bell",
        "categories": null,
        "correct_answer_mapping": null
      }
    },
    {
      "index": 19,
      "title": "Movies",
      "heading": "Which movie won the Academy Award for Best Picture in 1994?",
      "description": "The 1994 Academy Awards recognized outstanding films from 1993, with one particular drama taking the top honor.",
      "questionData": {
        "questionType": "mcq",
        "options": [
          {"option": "The Shawshank Redemption"},
          {"option": "Forrest Gump"},
          {"option": "Pulp Fiction"},
          {"option": "Schindler's List"}
        ],
        "correctAnswer": "Schindler's List",
        "categories": null,
        "correct_answer_mapping": null
      }
    },
    {
      "index": 20,
      "title": "Countries",
      "heading": "Which country has the largest land area?",
      "description": "Earth's landmasses are distributed unevenly among nations, with one country covering a significantly larger area than others.",
      "questionData": {
        "questionType": "mcq",
        "options": [
          {"option": "Canada"},
          {"option": "China"},
          {"option": "United States"},
          {"option": "Russia"}
        ],
        "correctAnswer": "Russia",
        "categories": null,
        "correct_answer_mapping": null
      }
    },
    {
      "index": 21,
      "title": "Computer Science",
      "heading": "What does 'CPU' stand for?",
      "description": "This component serves as the primary processing unit in computers, executing instructions and performing calculations.",
      "questionData": {
        "questionType": "mcq",
        "options": [
          {"option": "Central Processing Unit"},
          {"option": "Computer Processing Unit"},
          {"option": "Central Program Unit"},
          {"option": "Computer Program Unit"}
        ],
        "correctAnswer": "Central Processing Unit",
        "categories": null,
        "correct_answer_mapping": null
      }
    },
    {
      "index": 22,
      "title": "Rivers",
      "heading": "Which is the longest river in the world?",
      "description": "Rivers play crucial roles in geography and human civilization, with some spanning vast distances across continents.",
      "questionData": {
        "questionType": "mcq",
        "options": [
          {"option": "Amazon River"},
          {"option": "Nile River"},
          {"option": "Mississippi River"},
          {"option": "Yangtze River"}
        ],
        "correctAnswer": "Nile River",
        "categories": null,
        "correct_answer_mapping": null
      }
    },
    {
      "index": 23,
      "title": "Nobel Prize",
      "heading": "In which year was the first Nobel Prize awarded?",
      "description": "The Nobel Prize was established to honor outstanding contributions to humanity in various fields of achievement.",
      "questionData": {
        "questionType": "mcq",
        "options": [
          {"option": "1895"},
          {"option": "1900"},
          {"option": "1901"},
          {"option": "1905"}
        ],
        "correctAnswer": "1901",
        "categories": null,
        "correct_answer_mapping": null
      }
    },
    {
      "index": 24,
      "title": "Mythology",
      "heading": "In Greek mythology, who is the king of the gods?",
      "description": "Greek mythology features a pantheon of deities, with one supreme god ruling over Mount Olympus.",
      "questionData": {
        "questionType": "mcq",
        "options": [
          {"option": "Poseidon"},
          {"option": "Hades"},
          {"option": "Zeus"},
          {"option": "Apollo"}
        ],
        "correctAnswer": "Zeus",
        "categories": null,
        "correct_answer_mapping": null
      }
    },
    {
      "index": 25,
      "title": "Medical Terms",
      "heading": "What does the medical term 'hypertension' refer to?",
      "description": "Medical terminology often uses Greek or Latin roots to describe conditions and symptoms in standardized ways.",
      "questionData": {
        "questionType": "mcq",
        "options": [
          {"option": "Low blood sugar"},
          {"option": "High blood pressure"},
          {"option": "Rapid heartbeat"},
          {"option": "Difficulty breathing"}
        ],
        "correctAnswer": "High blood pressure",
        "categories": null,
        "correct_answer_mapping": null
      }
    },
    {
      "index": 26,
      "title": "Philosophy",
      "heading": "Who wrote 'The Republic'?",
      "description": "This influential work of political philosophy explores justice, governance, and the ideal state.",
      "questionData": {
        "questionType": "mcq",
        "options": [
          {"option": "Aristotle"},
          {"option": "Socrates"},
          {"option": "Plato"},
          {"option": "Epicurus"}
        ],
        "correctAnswer": "Plato",
        "categories": null,
        "correct_answer_mapping": null
      }
    },
    {
      "index": 27,
      "title": "Weather Phenomena",
      "heading": "What instrument is used to measure atmospheric pressure?",
      "description": "Atmospheric pressure measurement is crucial for weather forecasting and understanding meteorological conditions.",
      "questionData": {
        "questionType": "mcq",
        "options": [
          {"option": "Thermometer"},
          {"option": "Barometer"},
          {"option": "Hygrometer"},
          {"option": "Anemometer"}
        ],
        "correctAnswer": "Barometer",
        "categories": null,
        "correct_answer_mapping": null
      }
    },
    {
      "index": 28,
      "title": "Architecture Styles",
      "heading": "Categorize this architectural feature by its historical period.",
      "description": "Architectural styles reflect the cultural, technological, and artistic values of their respective time periods.",
      "questionData": {
        "questionType": "sort",
        "options": [
          {"option": "Flying buttress"}
        ],
        "correctAnswer": "Categorize by architectural period",
        "categories": ["Gothic Architecture", "Classical Architecture"],
        "correct_answer_mapping": {
          "Gothic Architecture": ["Flying buttress"],
          "Classical Architecture": []
        }
      }
    },
    {
      "index": 29,
      "title": "Colors",
      "heading": "What are the three primary colors in traditional color theory?",
      "description": "Primary colors cannot be created by mixing other colors and serve as the foundation for all other colors.",
      "questionData": {
        "questionType": "mcq",
        "options": [
          {"option": "Red, green, blue"},
          {"option": "Red, yellow, blue"},
          {"option": "Red, orange, yellow"},
          {"option": "Blue, green, purple"}
        ],
        "correctAnswer": "Red, yellow, blue",
        "categories": null,
        "correct_answer_mapping": null
      }
    },
    {
      "index": 30,
      "title": "Economics",
      "heading": "What does 'GDP' stand for?",
      "description": "This economic indicator measures the total value of goods and services produced within a country's borders.",
      "questionData": {
        "questionType": "mcq",
        "options": [
          {"option": "Gross Domestic Product"},
          {"option": "General Domestic Production"},
          {"option": "Global Domestic Product"},
          {"option": "Gross Development Program"}
        ],
        "correctAnswer": "Gross Domestic Product",
        "categories": null,
        "correct_answer_mapping": null
      }
    },
    {
      "index": 31,
      "title": "Ancient Civilizations",
      "heading": "Which ancient wonder of the world was located in Alexandria?",
      "description": "The Seven Wonders of the Ancient World represented remarkable architectural and engineering achievements of their time.",
      "questionData": {
        "questionType": "mcq",
        "options": [
          {"option": "Hanging Gardens"},
          {"option": "Lighthouse of Alexandria"},
          {"option": "Colossus of Rhodes"},
          {"option": "Temple of Artemis"}
        ],
        "correctAnswer": "Lighthouse of Alexandria",
        "categories": null,
        "correct_answer_mapping": null
      }
    },
    {
      "index": 32,
      "title": "Vitamins",
      "heading": "Which vitamin is produced when skin is exposed to sunlight?",
      "description": "The human body can synthesize certain vitamins, with one particularly important for bone health being produced through sun exposure.",
      "questionData": {
        "questionType": "mcq",
        "options": [
          {"option": "Vitamin A"},
          {"option": "Vitamin C"},
          {"option": "Vitamin D"},
          {"option": "Vitamin E"}
        ],
        "correctAnswer": "Vitamin D",
        "categories": null,
        "correct_answer_mapping": null
      }
    },
    {
      "index": 33,
      "title": "Music Theory",
      "heading": "How many notes are in a standard musical octave?",
      "description": "The octave is a fundamental concept in music theory, representing the interval between musical pitches.",
      "questionData": {
        "questionType": "mcq",
        "options": [
          {"option": "7"},
          {"option": "8"},
          {"option": "12"},
          {"option": "16"}
        ],
        "correctAnswer": "8",
        "categories": null,
        "correct_answer_mapping": null
      }
    },
    {
      "index": 34,
      "title": "Time Zones",
      "heading": "What is the time difference between Eastern and Pacific time zones in the US?",
      "description": "Time zones were established to standardize time across different geographical regions based on the sun's position.",
      "questionData": {
        "questionType": "mcq",
        "options": [
          {"option": "2 hours"},
          {"option": "3 hours"},
          {"option": "4 hours"},
          {"option": "5 hours"}
        ],
        "correctAnswer": "3 hours",
        "categories": null,
        "correct_answer_mapping": null
      }
    },
    {
      "index": 35,
      "title": "Mammals",
      "heading": "Which mammal is capable of true flight?",
      "description": "While many mammals can glide, only one group has evolved the ability for powered, sustained flight.",
      "questionData": {
        "questionType": "mcq",
        "options": [
          {"option": "Flying squirrel"},
          {"option": "Bat"},
          {"option": "Sugar glider"},
          {"option": "Flying lemur"}
        ],
        "correctAnswer": "Bat",
        "categories": null,
        "correct_answer_mapping": null
      }
    },
    {
      "index": 36,
      "title": "Elements",
      "heading": "What is the lightest element on the periodic table?",
      "description": "The periodic table arranges elements by atomic number, with the simplest and lightest element having just one proton.",
      "questionData": {
        "questionType": "mcq",
        "options": [
          {"option": "Helium"},
          {"option": "Hydrogen"},
          {"option": "Lithium"},
          {"option": "Carbon"}
        ],
        "correctAnswer": "Hydrogen",
        "categories": null,
        "correct_answer_mapping": null
      }
    },
    {
      "index": 37,
      "title": "Continents",
      "heading": "How many continents are there traditionally considered to be?",
      "description": "The division of Earth's landmasses into continents varies by cultural and geographical perspectives, but one number is most commonly accepted.",
      "questionData": {
        "questionType": "mcq",
        "options": [
          {"option": "5"},
          {"option": "6"},
          {"option": "7"},
          {"option": "8"}
        ],
        "correctAnswer": "7",
        "categories": null,
        "correct_answer_mapping": null
      }
    },
    {
      "index": 38,
      "title": "Shakespeare",
      "heading": "In which city is Shakespeare's 'Romeo and Juliet' set?",
      "description": "Shakespeare's tragic love story takes place in an Italian city known for its romantic associations.",
      "questionData": {
        "questionType": "mcq",
        "options": [
          {"option": "Venice"},
          {"option": "Florence"},
          {"option": "Verona"},
          {"option": "Rome"}
        ],
        "correctAnswer": "Verona",
        "categories": null,
        "correct_answer_mapping": null
      }
    },
    {
      "index": 39,
      "title": "Transportation Methods",
      "heading": "Categorize this vehicle by its primary environment of operation.",
      "description": "Different vehicles are designed and optimized for specific environments and conditions.",
      "questionData": {
        "questionType": "sort",
        "options": [
          {"option": "Submarine"}
        ],
        "correctAnswer": "Categorize by operating environment",
        "categories": ["Underwater Vehicle", "Aerial Vehicle"],
        "correct_answer_mapping": {
          "Underwater Vehicle": ["Submarine"],
          "Aerial Vehicle": []
        }
      }
    },
    {
      "index": 40,
      "title": "Insects",
      "heading": "How many legs does an adult spider have?",
      "description": "Spiders belong to the arachnid family and have a characteristic number of legs that distinguishes them from insects.",
      "questionData": {
        "questionType": "mcq",
        "options": [
          {"option": "6"},
          {"option": "8"},
          {"option": "10"},
          {"option": "12"}
        ],
        "correctAnswer": "8",
        "categories": null,
        "correct_answer_mapping": null
      }
    },
    {
      "index": 41,
      "title": "Presidents",
      "heading": "Who was the first President of the United States?",
      "description": "The first US President set many precedents and helped establish the foundations of American democracy.",
      "questionData": {
        "questionType": "mcq",
        "options": [
          {"option": "John Adams"},
          {"option": "Thomas Jefferson"},
          {"option": "George Washington"},
          {"option": "Benjamin Franklin"}
        ],
        "correctAnswer": "George Washington",
        "categories": null,
        "correct_answer_mapping": null
      }
    },
    {
      "index": 42,
      "title": "Speed of Light",
      "heading": "Approximately how fast does light travel in a vacuum?",
      "description": "The speed of light is a fundamental physical constant and represents the maximum speed at which information can travel.",
      "questionData": {
        "questionType": "mcq",
        "options": [
          {"option": "300,000 km/s"},
          {"option": "300,000,000 m/s"},
          {"option": "Both of the above"},
          {"option": "Neither of the above"}
        ],
        "correctAnswer": "Both of the above",
        "categories": null,
        "correct_answer_mapping": null
      }
    },
    {
      "index": 43,
      "title": "Dinosaurs",
      "heading": "During which geological era did dinosaurs primarily exist?",
      "description": "Dinosaurs dominated terrestrial ecosystems for millions of years during a specific geological time period.",
      "questionData": {
        "questionType": "mcq",
        "options": [
          {"option": "Paleozoic Era"},
          {"option": "Mesozoic Era"},
          {"option": "Cenozoic Era"},
          {"option": "Precambrian Era"}
        ],
        "correctAnswer": "Mesozoic Era",
        "categories": null,
        "correct_answer_mapping": null
      }
    },
    {
      "index": 44,
      "title": "Optics",
      "heading": "What happens to white light when it passes through a prism?",
      "description": "Prisms demonstrate the wave nature of light by separating it into its component wavelengths.",
      "questionData": {
        "questionType": "mcq",
        "options": [
          {"option": "It becomes invisible"},
          {"option": "It splits into a spectrum of colors"},
          {"option": "It becomes brighter"},
          {"option": "It changes to blue light"}
        ],
        "correctAnswer": "It splits into a spectrum of colors",
        "categories": null,
        "correct_answer_mapping": null
      }
    },
    {
      "index": 45,
      "title": "Olympics",
      "heading": "Where were the first modern Olympic Games held?",
      "description": "The modern Olympic Games were revived in the 19th century, connecting to the ancient Greek tradition.",
      "questionData": {
        "questionType": "mcq",
        "options": [
          {"option": "Rome, Italy"},
          {"option": "Paris, France"},
          {"option": "Athens, Greece"},
          {"option": "London, England"}
        ],
        "correctAnswer": "Athens, Greece",
        "categories": null,
        "correct_answer_mapping": null
      }
    },
    {
      "index": 46,
      "title": "Deserts",
      "heading": "What is the largest desert in the world?",
      "description": "Deserts are defined by their low precipitation rather than temperature, leading to some surprising classifications.",
      "questionData": {
        "questionType": "mcq",
        "options": [
          {"option": "Sahara Desert"},
          {"option": "Gobi Desert"},
          {"option": "Antarctic Desert"},
          {"option": "Arabian Desert"}
        ],
        "correctAnswer": "Antarctic Desert",
        "categories": null,
        "correct_answer_mapping": null
      }
    },
    {
      "index": 47,
      "title": "Electricity",
      "heading": "Who is credited with the discovery of electricity?",
      "description": "While electricity was observed in ancient times, systematic study began with specific researchers in the 18th century.",
      "questionData": {
        "questionType": "mcq",
        "options": [
          {"option": "Thomas Edison"},
          {"option": "Benjamin Franklin"},
          {"option": "Nikola Tesla"},
          {"option": "Alessandro Volta"}
        ],
        "correctAnswer": "Benjamin Franklin",
        "categories": null,
        "correct_answer_mapping": null
      }
    },
    {
      "index": 48,
      "title": "Mountains",
      "heading": "What is the highest mountain peak in North America?",
      "description": "Mountain peaks are measured from sea level, with the highest representing significant geographical landmarks.",
      "questionData": {
        "questionType": "mcq",
        "options": [
          {"option": "Mount McKinley (Denali)"},
          {"option": "Mount Whitney"},
          {"option": "Mount Washington"},
          {"option": "Mount Mitchell"}
        ],
        "correctAnswer": "Mount McKinley (Denali)",
        "categories": null,
        "correct_answer_mapping": null
      }
    },
    {
      "index": 49,
      "title": "Literary Genres",
      "heading": "Categorize this literary work by its genre.",
      "description": "Literary genres help classify works based on their style, content, and narrative structure.",
      "questionData": {
        "questionType": "sort",
        "options": [
          {"option": "The Odyssey"}
        ],
        "correctAnswer": "Categorize by literary genre",
        "categories": ["Epic Poetry", "Modern Novel"],
        "correct_answer_mapping": {
          "Epic Poetry": ["The Odyssey"],
          "Modern Novel": []
        }
      }
    }
  ]
};