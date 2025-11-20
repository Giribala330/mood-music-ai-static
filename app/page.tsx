"use client";

import { useState } from "react";

type Track = {
  title: string;
  artist: string;
  year: number;
  link: string;
};

const MOODS = [
  { key: "happy", label: "😄 Happy" },
  { key: "sad", label: "😢 Sad" },
  { key: "chill", label: "😌 Chill" },
  { key: "workout", label: "💪 Workout" },
  { key: "heartbreak", label: "💔 Heartbreak" },
  { key: "party", label: "🎉 Party" },
];

// Spotify URLs – user opens song in Spotify and taps Play.
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
      title: "Don’u Don’u Don’u",
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

export default function HomePage() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const tracks = selectedMood ? PLAYLISTS[selectedMood] ?? [] : [];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black text-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl py-10">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Mood-Based Music Recommender (Tamil)
          </h1>
          <p className="mt-3 text-slate-300 max-w-2xl mx-auto">
            Select how you feel right now and get a curated list of Tamil songs
            (2005–present) that match your vibe. Click any song to open it in
            Spotify, then tap the play button there to start listening.
          </p>
        </header>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3 text-slate-100">
            1. Choose your mood
          </h2>
          <div className="flex flex-wrap gap-3">
            {MOODS.map((mood) => (
              <button
                key={mood.key}
                onClick={() => setSelectedMood(mood.key)}
                className={`px-4 py-2 rounded-full text-sm md:text-base border transition
                  ${
                    selectedMood === mood.key
                      ? "bg-emerald-500 border-emerald-400 text-black shadow-lg shadow-emerald-500/40"
                      : "bg-slate-800 border-slate-600 hover:bg-slate-700"
                  }`}
              >
                {mood.label}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-slate-400">
            (Song links open Spotify in your browser or app – then you tap ▶ to
            play.)
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3 text-slate-100">
            2. Suggested songs
          </h2>

          {!selectedMood && (
            <div className="py-6 text-sm text-slate-400">
              No songs yet. Pick a mood above to see recommendations.
            </div>
          )}

          {selectedMood && tracks.length === 0 && (
            <div className="py-6 text-sm text-slate-400">
              No songs configured for this mood yet.
            </div>
          )}

          {selectedMood && tracks.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2">
              {tracks.map((track) => (
                <a
                  key={track.title + track.artist}
                  href={track.link}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-slate-900/70 border border-slate-700 rounded-2xl p-4 flex flex-col justify-between hover:border-emerald-400 hover:translate-y-0.5 transition"
                >
                  <div>
                    <h3 className="font-semibold text-sm md:text-base">
                      {track.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      {track.artist} • {track.year}
                    </p>
                  </div>
                  <p className="mt-3 text-[11px] text-emerald-300">
                    Open in Spotify and tap ▶ to play ↗
                  </p>
                </a>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
