"use client";

import { useState, useMemo } from "react";

type Track = {
  title: string;
  artist: string;
  year: number;
  link: string;
};

const MOODS = [
  { key: "happy", label: "Happy", emoji: "😄", color: "from-yellow-400 to-orange-500" },
  { key: "sad", label: "Sad", emoji: "😢", color: "from-blue-400 to-indigo-600" },
  { key: "chill", label: "Chill", emoji: "😌", color: "from-teal-400 to-cyan-500" },
  { key: "workout", label: "Workout", emoji: "💪", color: "from-red-500 to-pink-600" },
  { key: "heartbreak", label: "Heartbreak", emoji: "💔", color: "from-purple-500 to-pink-500" },
  { key: "party", label: "Party", emoji: "🎉", color: "from-fuchsia-500 to-purple-600" },
];

const PLAYLISTS: Record<string, Track[]> = {
  happy: [
    {
      title: "Vaathi Coming",
      artist: "Anirudh Ravichander",
      year: 2020,
      link: "https://open.spotify.com/search/vaathi%20coming%20anirudh%20ravichander",
    },
    {
      title: "Arabic Kuthu (Halamithi Habibo)",
      artist: "Anirudh Ravichander, Jonita Gandhi",
      year: 2022,
      link: "https://open.spotify.com/search/arabic%20kuthu%20anirudh%20jonita",
    },
    {
      title: "Jimikki Ponnu",
      artist: "Anirudh Ravichander, Jonita Gandhi",
      year: 2022,
      link: "https://open.spotify.com/search/jimikki%20ponnu%20tamil",
    },
    {
      title: "Naa Ready",
      artist: "Anirudh Ravichander, Thalapathy Vijay",
      year: 2023,
      link: "https://open.spotify.com/search/naa%20ready%20leo%20tamil",
    },
    {
      title: "Aaluma Doluma",
      artist: "Anirudh Ravichander",
      year: 2015,
      link: "https://open.spotify.com/search/aaluma%20doluma%20vedalam",
    },
    {
      title: "Google Google",
      artist: "Thalapathy Vijay, Andrea Jeremiah",
      year: 2012,
      link: "https://open.spotify.com/search/google%20google%20thuppakki",
    },
    {
      title: "Selfie Pulla",
      artist: "Thalapathy Vijay, Sunidhi Chauhan",
      year: 2014,
      link: "https://open.spotify.com/search/selfie%20pulla%20kaththi",
    },
    {
      title: "Don'u Don'u Don'u",
      artist: "Anirudh Ravichander, Alisha Thomas",
      year: 2015,
      link: "https://open.spotify.com/search/donu%20donu%20donu%20maari",
    },
    {
      title: "Ranjithame",
      artist: "Thalapathy Vijay, M.M. Manasi",
      year: 2022,
      link: "https://open.spotify.com/search/ranjithame%20varisu",
    },
    {
      title: "Why This Kolaveri Di",
      artist: "Dhanush, Anirudh Ravichander",
      year: 2011,
      link: "https://open.spotify.com/search/why%20this%20kolaveri%20di",
    },
  ],

  sad: [
    {
      title: "Suttrum Vizhi",
      artist: "Harris Jayaraj",
      year: 2005,
      link: "https://open.spotify.com/search/suttrum%20vizhi%20ghajini",
    },
    {
      title: "New York Nagaram",
      artist: "A.R. Rahman",
      year: 2006,
      link: "https://open.spotify.com/search/new%20york%20nagaram%20sillunu%20oru%20kadhal",
    },
    {
      title: "Munbe Vaa",
      artist: "Shreya Ghoshal, Naresh Iyer",
      year: 2006,
      link: "https://open.spotify.com/search/munbe%20vaa%20sillunu%20oru%20kadhal",
    },
    {
      title: "Pookkal Pookkum",
      artist: "G.V. Prakash Kumar, Roop Kumar Rathod",
      year: 2010,
      link: "https://open.spotify.com/search/pookkal%20pookkum%20madrasapattinam",
    },
    {
      title: "Nenjukkul Peidhidum",
      artist: "Harris Jayaraj, Hariharan",
      year: 2008,
      link: "https://open.spotify.com/search/nenjukkul%20peidhidum%20vaan%20minnalai",
    },
    {
      title: "En Kadhal Solla",
      artist: "Yuvan Shankar Raja",
      year: 2010,
      link: "https://open.spotify.com/search/en%20kadhal%20sollya%20paiyaa",
    },
    {
      title: "Unakkena Venum Sollu",
      artist: "Mahathi",
      year: 2015,
      link: "https://open.spotify.com/search/unakkena%20venum%20sollu%20yaradi%20nee%20mohini",
    },
    {
      title: "Maruvaarthai",
      artist: "Sid Sriram",
      year: 2017,
      link: "https://open.spotify.com/search/maruvaarthai%20ennai%20maruvaarthai",
    },
    {
      title: "Thalli Pogathey",
      artist: "Sid Sriram, A.R. Rahman",
      year: 2015,
      link: "https://open.spotify.com/search/thalli%20pogathey%20achcham%20yenbadhu%20madamaiyada",
    },
    {
      title: "Yennai Thalatta Varuvala",
      artist: "Hariharan (Re-release / playlists)",
      year: 2005,
      link: "https://open.spotify.com/search/yennai%20thalatta%20varuvala%20tamil",
    },
  ],

  chill: [
    {
      title: "Pogiren Pogiren",
      artist: "G.V. Prakash Kumar",
      year: 2005,
      link: "https://open.spotify.com/search/pogiren%20pogiren%20deivamagal",
    },
    {
      title: "Naan Nee",
      artist: "Santhosh Narayanan, Dhanush",
      year: 2014,
      link: "https://open.spotify.com/search/naan%20nee%20madras",
    },
    {
      title: "Kadhal Cricket",
      artist: "Dhanush, Anirudh",
      year: 2015,
      link: "https://open.spotify.com/search/kadhal%20cricket%20thani%20oruvan",
    },
    {
      title: "Pachai Nirame",
      artist: "Hariharan (widely on playlists; still chill)",
      year: 2006,
      link: "https://open.spotify.com/search/pachai%20nirame%20alaipayuthey",
    },
    {
      title: "Anbil Avan",
      artist: "A.R. Rahman",
      year: 2010,
      link: "https://open.spotify.com/search/anbil%20avan%20vinnai%20thaandi%20varuvaaya",
    },
    {
      title: "Kangal Neeye",
      artist: "Sid Sriram",
      year: 2020,
      link: "https://open.spotify.com/search/kangal%20neeye%20sid%20sriram",
    },
    {
      title: "Kaadhal Sadugudu",
      artist: "Sriram Parthasarathy (still widely used)",
      year: 2005,
      link: "https://open.spotify.com/search/kaadhal%20sadugudu%20alaipayuthey",
    },
    {
      title: "Kaattu Payale",
      artist: "Dhee, G.V. Prakash Kumar",
      year: 2020,
      link: "https://open.spotify.com/search/kaattu%20payale%20soorarai%20pottru",
    },
    {
      title: "Ennai Vittu",
      artist: "Sid Sriram",
      year: 2023,
      link: "https://open.spotify.com/search/ennai%20vittu%20sid%20sriram",
    },
    {
      title: "Megham Karukatha",
      artist: "Anirudh Ravichander",
      year: 2022,
      link: "https://open.spotify.com/search/megham%20karukatha%20thiruchitrambalam",
    },
  ],

  workout: [
    {
      title: "Surviva",
      artist: "Anirudh Ravichander, Yogi B",
      year: 2017,
      link: "https://open.spotify.com/search/surviva%20vivegam",
    },
    {
      title: "Aalaporan Thamizhan",
      artist: "A.R. Rahman",
      year: 2017,
      link: "https://open.spotify.com/search/aalaporan%20thamizhan%20mersal",
    },
    {
      title: "Verithanam",
      artist: "Thalapathy Vijay, Anirudh",
      year: 2019,
      link: "https://open.spotify.com/search/verithanam%20bigil",
    },
    {
      title: "Naanga Vera Maari",
      artist: "Yuvan Shankar Raja",
      year: 2022,
      link: "https://open.spotify.com/search/naanga%20vera%20maari%20valimai",
    },
    {
      title: "Vaathi Raid",
      artist: "Arivu, Anirudh",
      year: 2020,
      link: "https://open.spotify.com/search/vaathi%20raid%20master",
    },
    {
      title: "Pathala Pathala",
      artist: "Kamal Haasan, Anirudh",
      year: 2022,
      link: "https://open.spotify.com/search/pathala%20pathala%20vikram",
    },
    {
      title: "Vikram Title Track",
      artist: "Anirudh Ravichander",
      year: 2022,
      link: "https://open.spotify.com/search/vikram%20title%20track%20anirudh",
    },
    {
      title: "Machi Open The Bottle",
      artist: "Devi Sri Prasad",
      year: 2010,
      link: "https://open.spotify.com/search/machi%20open%20the%20bottle%20mankatha",
    },
    {
      title: "Otha Sollaala",
      artist: "Velayudham Movie",
      year: 2011,
      link: "https://open.spotify.com/search/otha%20sollaala%20aadukalam",
    },
    {
      title: "Vroom Vroom",
      artist: "Anirudh Ravichander",
      year: 2020,
      link: "https://open.spotify.com/search/vroom%20vroom%20tamil%20song",
    },
  ],

  heartbreak: [
    {
      title: "Ennodu Nee Irundhal",
      artist: "Sid Sriram, A.R. Rahman",
      year: 2015,
      link: "https://open.spotify.com/search/ennodu%20nee%20irundhal%20i%20movie",
    },
    {
      title: "Yennai Maatrum Kadhale",
      artist: "Sid Sriram",
      year: 2015,
      link: "https://open.spotify.com/search/yennai%20maatrum%20kadhale%20naanum%20rowdy%20dhaan",
    },
    {
      title: "Unakkenna Venum Sollu (Slow version)",
      artist: "Sathya Prakash",
      year: 2015,
      link: "https://open.spotify.com/search/unakkenna%20venum%20sollu%20slow",
    },
    {
      title: "Mazhai Vara Pogudhae",
      artist: "Karthik, Sunitha Sarathy",
      year: 2008,
      link: "https://open.spotify.com/search/mazhai%20vara%20pogudhae%20ayya",
    },
    {
      title: "Adiye Kolluthey",
      artist: "A.R. Rahman",
      year: 2008,
      link: "https://open.spotify.com/search/adiye%20kolluthey%20vaaranam%20aayiram",
    },
    {
      title: "Sattru Munbu",
      artist: "Shakthisree Gopalan",
      year: 2014,
      link: "https://open.spotify.com/search/sattru%20munbu%20neethaane%20en%20ponvasantham",
    },
    {
      title: "Thalli Pogathey (Heartbreak feel)",
      artist: "Sid Sriram",
      year: 2015,
      link: "https://open.spotify.com/search/thalli%20pogathey%20tamil",
    },
    {
      title: "Yaen Ennai Pirindhaai",
      artist: "Sid Sriram",
      year: 2019,
      link: "https://open.spotify.com/search/yaen%20ennai%20pirindhaai%20adhae%20kangalae",
    },
    {
      title: "Marakkavillayae",
      artist: "Sid Sriram",
      year: 2021,
      link: "https://open.spotify.com/search/marakkavillayae%20tamil",
    },
    {
      title: "Kanave Kanave",
      artist: "Anirudh Ravichander",
      year: 2013,
      link: "https://open.spotify.com/search/kanave%20kanave%20david%20tamil",
    },
  ],

  party: [
    {
      title: "Local Boys",
      artist: "Anirudh Ravichander",
      year: 2013,
      link: "https://open.spotify.com/search/local%20boys%20ethir%20neechal",
    },
    {
      title: "Party with the Pei",
      artist: "Anirudh Ravichander",
      year: 2015,
      link: "https://open.spotify.com/search/party%20with%20the%20pei%20arun%20vijay",
    },
    {
      title: "Anirudh - Sodakku",
      artist: "Anthony Daasan",
      year: 2017,
      link: "https://open.spotify.com/search/sodakku%20mela%20sodakku%20thaana",
    },
    {
      title: "Chillax",
      artist: "Devi Sri Prasad",
      year: 2013,
      link: "https://open.spotify.com/search/chillax%20tamil%20song",
    },
    {
      title: "Danga Maari Oodhari",
      artist: "Anirudh Ravichander",
      year: 2014,
      link: "https://open.spotify.com/search/danga%20maari%20oodhari%20anuvab%20tamil",
    },
    {
      title: "Oru Kuchi Oru Kulfi",
      artist: "Harris Jayaraj",
      year: 2012,
      link: "https://open.spotify.com/search/oru%20kuchi%20oru%20kulfi%20tamil",
    },
    {
      title: "Vaada Bin Laada",
      artist: "D. Imman",
      year: 2011,
      link: "https://open.spotify.com/search/vaada%20bin%20laada%20siruthai",
    },
    {
      title: "Rangu Rakkara",
      artist: "Anirudh Ravichander",
      year: 2016,
      link: "https://open.spotify.com/search/rangu%20rakkara%20remix%20tamil",
    },
    {
      title: "Pudhu Metro Rail",
      artist: "D. Imman",
      year: 2012,
      link: "https://open.spotify.com/search/pudhu%20metro%20rail%20thiruttuppayale%202",
    },
    {
      title: "Chellamma",
      artist: "Anirudh Ravichander, Jonita Gandhi",
      year: 2020,
      link: "https://open.spotify.com/search/chellamma%20doctor%20movie",
    },
  ],
};

// Background image
const BACKGROUND_IMAGE =
  "https://pbs.twimg.com/media/Ewht07BVoAIUW9i.jpg";

// 🔀 Shuffle helper – returns a new array in random order
function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function HomePage() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [shuffleSeed, setShuffleSeed] = useState(0); // used to trigger reshuffle

  const tracks = useMemo(() => {
    if (!selectedMood) return [];
    const list = PLAYLISTS[selectedMood] ?? [];
    return shuffle(list); // 🔀 shuffled order every time
  }, [selectedMood, shuffleSeed]);

  const currentMood = MOODS.find((m) => m.key === selectedMood);

  return (
    <main className="min-h-screen text-white relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${BACKGROUND_IMAGE})`,
            transform: "scale(1.05)",
          }}
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/85 to-black/90" />
      </div>

      {/* Animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute top-1/3 -right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute -bottom-1/4 left-1/3 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <header className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-4">
            <div className="text-6xl mb-2">🎵</div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Tamil Music Mood
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Discover the perfect Tamil songs for every moment.
          </p>
        </header>

        {/* Mood Selection */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-center text-slate-200">
            How are you feeling today?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {MOODS.map((mood) => (
              <button
                key={mood.key}
                onClick={() => {
                  setSelectedMood(mood.key);
                  setShuffleSeed((s) => s + 1); // 🔀 reshuffle on every click
                }}
                className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${
                  selectedMood === mood.key
                    ? "ring-4 ring-white shadow-2xl scale-105"
                    : "hover:shadow-xl"
                }`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${mood.color} opacity-80 group-hover:opacity-100 transition-opacity`}
                />
                <div className="relative z-10 flex flex-col items-center">
                  <span className="text-4xl mb-2 transform group-hover:scale-110 transition-transform">
                    {mood.emoji}
                  </span>
                  <span className="text-sm font-semibold text-white">
                    {mood.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Song List */}
        <section>
          {!selectedMood && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4 opacity-50">🎧</div>
              <p className="text-xl text-slate-400">
                Select a mood above to discover your perfect playlist.
              </p>
            </div>
          )}

          {selectedMood && tracks.length > 0 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div
                  className={`inline-block px-6 py-3 rounded-full bg-gradient-to-r ${currentMood?.color} text-white font-semibold text-lg shadow-lg`}
                >
                  {currentMood?.emoji} {currentMood?.label} Vibes
                </div>
                <p className="text-sm text-slate-400 mt-3">
                  {tracks.length} songs curated just for you (order shuffled).
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {tracks.map((track, index) => (
                  <a
                    key={track.title + track.artist}
                    href={track.link}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-5 hover:bg-slate-800/80 hover:border-slate-600 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-2xl"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Gradient overlay on hover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${currentMood?.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity`}
                    />

                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-1 group-hover:text-white transition-colors">
                            {track.title}
                          </h3>
                          <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                            {track.artist}
                          </p>
                        </div>
                        <span className="text-xs font-medium text-slate-500 bg-slate-900/50 px-2 py-1 rounded-full">
                          {track.year}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700/50">
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                          </svg>
                          Spotify
                        </span>
                        <span className="text-xs font-medium text-emerald-400 group-hover:text-emerald-300 flex items-center gap-1">
                          Play Now
                          <svg
                            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </main>
  );
}
