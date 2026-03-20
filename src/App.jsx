import { useState, useEffect } from "react";

// ── GAME DATA ──────────────────────────────────────────────────────────────
const FIRST_FOUR = [
  { id:"ff1", date:"Tue Mar 17", time:"6:40 PM",  away:"UMBC Retrievers",           home:"Howard Bison",             seed_away:16, seed_home:16, region:"East",    tv:"truTV" },
  { id:"ff2", date:"Tue Mar 17", time:"9:15 PM",  away:"NC State Wolfpack",          home:"Texas Longhorns",          seed_away:11, seed_home:11, region:"West",    tv:"truTV" },
  { id:"ff3", date:"Wed Mar 18", time:"6:40 PM",  away:"Prairie View A&M Panthers",  home:"Lehigh Mountain Hawks",    seed_away:16, seed_home:16, region:"South",   tv:"truTV" },
  { id:"ff4", date:"Wed Mar 18", time:"9:15 PM",  away:"Miami (OH) RedHawks",        home:"SMU Mustangs",             seed_away:11, seed_home:11, region:"Midwest", tv:"truTV" },
];

const ROUND64 = [
  // ── THURSDAY MAR 19 ──
  { id:"r2",  date:"Thu Mar 19", time:"12:15 PM", away:"TCU Horned Frogs",         home:"Ohio State Buckeyes",      seed_away:9,  seed_home:8,  region:"East",    tv:"CBS"   },
  { id:"r28", date:"Thu Mar 19", time:"12:40 PM", away:"Troy Trojans",             home:"Nebraska Cornhuskers",     seed_away:13, seed_home:4,  region:"South",   tv:"truTV" },
  { id:"r5",  date:"Thu Mar 19", time:"1:30 PM",  away:"South Florida Bulls",      home:"Louisville Cardinals",     seed_away:11, seed_home:6,  region:"East",    tv:"TNT"   },
  { id:"r11", date:"Thu Mar 19", time:"1:50 PM",  away:"High Point Panthers",      home:"Wisconsin Badgers",        seed_away:12, seed_home:5,  region:"West",    tv:"TBS"   },
  { id:"r1",  date:"Thu Mar 19", time:"2:50 PM",  away:"Siena Saints",             home:"Duke Blue Devils",         seed_away:16, seed_home:1,  region:"East",    tv:"CBS",   nobet:true  },
  { id:"r27", date:"Thu Mar 19", time:"3:15 PM",  away:"McNeese Cowboys",          home:"Vanderbilt Commodores",    seed_away:12, seed_home:5,  region:"South",   tv:"truTV" },
  { id:"r6",  date:"Thu Mar 19", time:"4:05 PM",  away:"North Dakota State Bison", home:"Michigan State Spartans",  seed_away:14, seed_home:3,  region:"East",    tv:"TNT"   },
  { id:"r12", date:"Thu Mar 19", time:"4:25 PM",  away:"Hawai'i Rainbow Warriors", home:"Arkansas Razorbacks",      seed_away:13, seed_home:4,  region:"West",    tv:"TBS"   },
  { id:"r29", date:"Thu Mar 19", time:"6:50 PM",  away:"VCU Rams",                 home:"North Carolina Tar Heels", seed_away:11, seed_home:6,  region:"South",   tv:"TNT"   },
  { id:"r17", date:"Thu Mar 19", time:"7:10 PM",  away:"Howard Bison",             home:"Michigan Wolverines",      seed_away:16, seed_home:1,  region:"Midwest", tv:"CBS"   },
  { id:"r13", date:"Thu Mar 19", time:"7:25 PM",  away:"Texas Longhorns",           home:"BYU Cougars",              seed_away:11, seed_home:6,  region:"West",    tv:"TBS"   },
  { id:"r31", date:"Thu Mar 19", time:"7:35 PM",  away:"Texas A&M Aggies",         home:"Saint Mary's Gaels",       seed_away:10, seed_home:7,  region:"South",   tv:"truTV" },
  { id:"r30", date:"Thu Mar 19", time:"9:25 PM",  away:"Penn Quakers",             home:"Illinois Fighting Illini", seed_away:14, seed_home:3,  region:"South",   tv:"TNT"   },
  { id:"r25", date:"Fri Mar 20", time:"9:25 PM",  away:"Prairie View A&M Panthers", home:"Florida Gators",           seed_away:16, seed_home:1,  region:"South",   tv:"TNT"   },
  { id:"r18", date:"Thu Mar 19", time:"9:45 PM",  away:"Saint Louis Billikens",    home:"Georgia Bulldogs",         seed_away:9,  seed_home:8,  region:"Midwest", tv:"CBS"   },
  { id:"r14", date:"Thu Mar 19", time:"10:00 PM", away:"Kennesaw State Owls",      home:"Gonzaga Bulldogs",         seed_away:14, seed_home:3,  region:"West",    tv:"TBS"   },
  { id:"r32", date:"Thu Mar 19", time:"10:10 PM", away:"Idaho Vandals",            home:"Houston Cougars",          seed_away:15, seed_home:2,  region:"South",   tv:"truTV" },
  // ── FRIDAY MAR 20 ──
  { id:"r23", date:"Fri Mar 20", time:"12:15 PM", away:"Santa Clara Broncos",      home:"Kentucky Wildcats",        seed_away:10, seed_home:7,  region:"Midwest", tv:"CBS"   },
  { id:"r19", date:"Fri Mar 20", time:"12:40 PM", away:"Akron Zips",               home:"Texas Tech Red Raiders",   seed_away:12, seed_home:5,  region:"Midwest", tv:"truTV" },
  { id:"r9",  date:"Fri Mar 20", time:"1:35 PM",  away:"LIU Sharks",               home:"Arizona Wildcats",         seed_away:16, seed_home:1,  region:"West",    tv:"TNT",   nobet:true  },
  { id:"r22", date:"Fri Mar 20", time:"1:50 PM",  away:"Wright State Raiders",     home:"Virginia Cavaliers",       seed_away:14, seed_home:3,  region:"Midwest", tv:"TBS"   },
  { id:"r24", date:"Fri Mar 20", time:"2:50 PM",  away:"Tennessee State Tigers",   home:"Iowa State Cyclones",      seed_away:15, seed_home:2,  region:"Midwest", tv:"CBS"   },
  { id:"r20", date:"Fri Mar 20", time:"3:15 PM",  away:"Hofstra Pride",            home:"Alabama Crimson Tide",     seed_away:13, seed_home:4,  region:"Midwest", tv:"truTV", nobet:true  },
  { id:"r10", date:"Fri Mar 20", time:"4:10 PM",  away:"Utah State Aggies",        home:"Villanova Wildcats",       seed_away:8,  seed_home:9,  region:"West",    tv:"TNT"   },
  { id:"r21", date:"Fri Mar 20", time:"4:25 PM",  away:"Miami (OH) RedHawks",       home:"Tennessee Volunteers",     seed_away:11, seed_home:6,  region:"Midwest", tv:"TBS"   },
  { id:"r26", date:"Fri Mar 20", time:"6:50 PM",  away:"Iowa Hawkeyes",            home:"Clemson Tigers",           seed_away:8,  seed_home:9,  region:"South",   tv:"TNT"   },
  { id:"r3",  date:"Fri Mar 20", time:"7:10 PM",  away:"Northern Iowa Panthers",   home:"St. John's Red Storm",     seed_away:12, seed_home:5,  region:"East",    tv:"CBS",   nobet:true  },
  { id:"r7",  date:"Fri Mar 20", time:"7:25 PM",  away:"UCF Knights",              home:"UCLA Bruins",              seed_away:10, seed_home:7,  region:"East",    tv:"TBS"   },
  { id:"r16", date:"Fri Mar 20", time:"7:35 PM",  away:"Queens NC Royals",         home:"Purdue Boilermakers",      seed_away:15, seed_home:2,  region:"West",    tv:"truTV" },
  { id:"r4",  date:"Fri Mar 20", time:"9:45 PM",  away:"Cal Baptist Lancers",      home:"Kansas Jayhawks",          seed_away:13, seed_home:4,  region:"East",    tv:"CBS"   },
  { id:"r8",  date:"Fri Mar 20", time:"10:00 PM", away:"Furman Paladins",          home:"UConn Huskies",            seed_away:15, seed_home:2,  region:"East",    tv:"TBS"   },
  { id:"r15", date:"Fri Mar 20", time:"10:10 PM", away:"Missouri Tigers",          home:"Miami (FL) Hurricanes",    seed_away:10, seed_home:7,  region:"West",    tv:"truTV" },
];

const ROUND32 = [
  // ── SATURDAY MAR 21 ──
  { id:"s1",  date:"Sat Mar 21", time:"12:10 PM", away:"Saint Louis Billikens",    home:"Michigan Wolverines",      seed_away:9,  seed_home:1,  region:"Midwest", tv:"CBS"   },
  { id:"s2",  date:"Sat Mar 21", time:"2:45 PM",  away:"Louisville Cardinals",     home:"Michigan State Spartans",  seed_away:6,  seed_home:3,  region:"East",    tv:"CBS"   },
  { id:"s3",  date:"Sat Mar 21", time:"5:15 PM",  away:"TCU Horned Frogs",         home:"Duke Blue Devils",         seed_away:9,  seed_home:1,  region:"East",    tv:"CBS"   },
  { id:"s4",  date:"Sat Mar 21", time:"6:10 PM",  away:"Texas A&M Aggies",         home:"Houston Cougars",          seed_away:10, seed_home:2,  region:"South",   tv:"TBS"   },
  { id:"s5",  date:"Sat Mar 21", time:"7:10 PM",  away:"Texas Longhorns",          home:"Gonzaga Bulldogs",         seed_away:11, seed_home:3,  region:"West",    tv:"TBS"   },
  { id:"s6",  date:"Sat Mar 21", time:"7:50 PM",  away:"VCU Rams",                 home:"Illinois Fighting Illini", seed_away:11, seed_home:3,  region:"South",   tv:"TNT"   },
  { id:"s7",  date:"Sat Mar 21", time:"8:45 PM",  away:"Nebraska Cornhuskers",     home:"Vanderbilt Commodores",    seed_away:4,  seed_home:5,  region:"South",   tv:"TNT"   },
  { id:"s8",  date:"Sat Mar 21", time:"9:45 PM",  away:"High Point Panthers",      home:"Arkansas Razorbacks",      seed_away:12, seed_home:4,  region:"West",    tv:"TBS"   },
  // ── SUNDAY MAR 22 — TBD ──
];

// ── ROUNDS CONFIG ──────────────────────────────────────────────────────────
// Add new rounds here as tournament progresses. Set active:false to skip a round.
const ROUNDS = [
  { id:"firstfour", label:"🎟 First Four",   short:"FF",   games:FIRST_FOUR, dates:"Mar 17-18", active:true  },
  { id:"round64",   label:"🏀 Round of 64",  short:"R64",  games:ROUND64,    dates:"Mar 19-20", active:true  },
  { id:"round32",   label:"🔥 Round of 32",  short:"R32",  games:ROUND32,    dates:"Mar 21-22", active:true  },
  { id:"sweet16",   label:"🌟 Sweet 16",     short:"S16",  games:[],         dates:"Mar 26-27", active:false },
];

const ALL_GAMES  = ROUNDS.flatMap(r=>r.active?r.games:[]);
const BET_KEYS   = ["underdog_ml","first_10","tie"];
const BET_LABELS = { underdog_ml:"Dog ML", first_10:"First to 10", tie:"Tie" };
const BET_EMOJI  = { underdog_ml:"🐶", first_10:"🏀", tie:"🤝" };
const BET_COLOR  = { underdog_ml:"#d97706", first_10:"#2563eb", tie:"#7c3aed" };
const BET_LIGHT  = { underdog_ml:"#fef3c7", first_10:"#dbeafe", tie:"#ede9fe" };
const ADMIN_PIN  = "1234";
const STORE_KEY  = "bracket_bookie_v2";
const FN_URL = "/.netlify/functions/gamedata";

const ghRead = async () => {
  try {
    const res = await fetch(FN_URL);
    if(!res.ok) return null;
    return await res.json();
  } catch(e) { console.warn("GH read failed",e); return null; }
};

const ghWrite = async (data, sha) => {
  try {
    const res = await fetch(FN_URL, {method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({data,sha})});
    return res.ok;
  } catch(e) { console.warn("GH write failed",e); return false; }
};

// ── DEFAULT ODDS (DraftKings) ──────────────────────────────────────────────
const DEFAULT_ODDS = {
  ff1: { dog:"UMBC Retrievers",           underdog_ml:"-108",  first_10:"-115", tie:"+800" },
  ff2: { dog:"Texas Longhorns",           underdog_ml:"+105",  first_10:"-110", tie:"+750" },
  ff3: { dog:"Prairie View A&M Panthers", underdog_ml:"+140",  first_10:"-105", tie:"+800" },
  ff4: { dog:"Miami (OH) RedHawks",       underdog_ml:"+250",  first_10:"+120", tie:"+900" },
  r1:  { dog:"Siena Saints",              underdog_ml:"NO BET", first_10:"NO BET", tie:"NO BET" },
  r2:  { dog:"TCU Horned Frogs",          underdog_ml:"+120",  first_10:"+105", tie:"+800" },
  r3:  { dog:"Northern Iowa Panthers",    underdog_ml:"NO BET", first_10:"NO BET", tie:"NO BET" },
  r4:  { dog:"Cal Baptist Lancers",       underdog_ml:"+750",  first_10:"+180", tie:"+1400" },
  r5:  { dog:"South Florida Bulls",       underdog_ml:"+164",  first_10:"+115", tie:"+850" },
  r6:  { dog:"North Dakota State Bison",  underdog_ml:"+1000", first_10:"+205", tie:"+1500" },
  r7:  { dog:"UCF Knights",               underdog_ml:"+200",  first_10:"+120", tie:"+900" },
  r8:  { dog:"Furman Paladins",           underdog_ml:"+1700", first_10:"+285", tie:"+2000" },
  r9:  { dog:"LIU Sharks",               underdog_ml:"NO BET", first_10:"NO BET", tie:"NO BET" },
  r10: { dog:"Villanova Wildcats",        underdog_ml:"+105",  first_10:"+100", tie:"+800" },
  r11: { dog:"High Point Panthers",       underdog_ml:"+370",  first_10:"+135", tie:"+1000" },
  r12: { dog:"Hawai'i Rainbow Warriors",  underdog_ml:"+850",  first_10:"+175", tie:"+1400" },
  r13: { dog:"Texas Longhorns",           underdog_ml:"+114",  first_10:"",     tie:"+800" },
  r14: { dog:"Kennesaw State Owls",       underdog_ml:"+1600", first_10:"+235", tie:"+1800" },
  r15: { dog:"Missouri Tigers",           underdog_ml:"+110",  first_10:"-105", tie:"+800" },
  r16: { dog:"Queens NC Royals",          underdog_ml:"+2200", first_10:"+290", tie:"NO BET" },
  r17: { dog:"Howard Bison",              underdog_ml:"+3500", first_10:"",     tie:"NO BET" },
  r18: { dog:"Saint Louis Billikens",     underdog_ml:"+124",  first_10:"+100", tie:"+800" },
  r19: { dog:"Akron Zips",               underdog_ml:"+260",  first_10:"+120", tie:"+900" },
  r20: { dog:"Hofstra Pride",             underdog_ml:"NO BET", first_10:"NO BET", tie:"NO BET" },
  r21: { dog:"Miami (OH) RedHawks",        underdog_ml:"+410",  first_10:"NO BET", tie:"NO BET" },
  r22: { dog:"Wright State Raiders",      underdog_ml:"+1300", first_10:"+245", tie:"+1700" },
  r23: { dog:"Santa Clara Broncos",       underdog_ml:"+136",  first_10:"+105", tie:"+850" },
  r24: { dog:"Tennessee State Tigers",    underdog_ml:"+2200", first_10:"+300", tie:"NO BET" },
  r25: { dog:"Prairie View A&M Panthers", underdog_ml:"+5000", first_10:"NO BET", tie:"NO BET" },
  r26: { dog:"Clemson Tigers",            underdog_ml:"+114",  first_10:"-105", tie:"+800" },
  r27: { dog:"McNeese Cowboys",           underdog_ml:"+525",  first_10:"+150", tie:"+1100" },
  r28: { dog:"Troy Trojans",              underdog_ml:"+650",  first_10:"+165", tie:"+1200" },
  r29: { dog:"VCU Rams",                  underdog_ml:"+124",  first_10:"-105", tie:"+800" },
  r30: { dog:"Penn Quakers",              underdog_ml:"+2200", first_10:"+310", tie:"NO BET" },
  r31: { dog:"Texas A&M Aggies",          underdog_ml:"+136",  first_10:"+100", tie:"+800" },
  r32: { dog:"Idaho Vandals",             underdog_ml:"+2200", first_10:"+350", tie:"NO BET" },
  // ── ROUND OF 32 ──
  s1: { dog:"Saint Louis Billikens",    underdog_ml:"+600",  first_10:"+160", tie:"" },
  s2: { dog:"Louisville Cardinals",     underdog_ml:"+154",  first_10:"+110", tie:"" },
  s3: { dog:"TCU Horned Frogs",         underdog_ml:"+500",  first_10:"+155", tie:"" },
  s4: { dog:"Texas A&M Aggies",         underdog_ml:"+380",  first_10:"+150", tie:"" },
  s5: { dog:"Texas Longhorns",          underdog_ml:"+190",  first_10:"+120", tie:"" },
  s6: { dog:"VCU Rams",                 underdog_ml:"+410",  first_10:"+150", tie:"" },
  s7: { dog:"Nebraska Cornhuskers",     underdog_ml:"+124",  first_10:"-105", tie:"" },
  s8: { dog:"High Point Panthers",      underdog_ml:"+500",  first_10:"+150", tie:"" },
};

const fmt = (v) => { const n=parseFloat(v); if(!v||isNaN(n)) return null; return n>0?`+${n}`:`${n}`; };
const calcPayout = (stake, oddStr) => {
  const n=parseFloat(oddStr);
  if(!oddStr||isNaN(n)||!stake) return null;
  const dec=n>0?n/100+1:100/Math.abs(n)+1;
  return parseFloat((stake*dec).toFixed(2));
};
const groupBy = (arr,fn) => arr.reduce((a,x)=>{const k=fn(x);if(!a[k])a[k]=[];a[k].push(x);return a;},{});

// ── UI atoms ───────────────────────────────────────────────────────────────
const NavTab = ({active,onClick,children}) => (
  <button onClick={onClick} style={{padding:"10px 16px",border:"none",cursor:"pointer",fontFamily:"inherit",fontSize:11,fontWeight:700,letterSpacing:1.5,background:active?"#1e3a5f":"transparent",color:active?"#fff":"#64748b",borderBottom:active?"3px solid #f59e0b":"3px solid transparent"}}>{children}</button>
);
const PubTab = ({active,onClick,children}) => (
  <button onClick={onClick} style={{padding:"10px 20px",border:"none",cursor:"pointer",fontFamily:"inherit",fontSize:12,fontWeight:700,background:active?"#fff":"transparent",color:active?"#1e3a5f":"#94a3b8",borderBottom:active?"3px solid #1e3a5f":"3px solid transparent"}}>{children}</button>
);
const RoundBtn = ({active,onClick,skipped,children}) => (
  <button onClick={onClick} style={{padding:"8px 14px",borderRadius:8,border:`2px solid ${skipped?"#fca5a5":active?"#1e3a5f":"#e2e8f0"}`,background:skipped?"#fef2f2":active?"#1e3a5f":"#fff",color:skipped?"#dc2626":active?"#fff":"#64748b",fontFamily:"inherit",fontSize:11,fontWeight:700,cursor:"pointer",position:"relative"}}>
    {children}{skipped&&<span style={{marginLeft:6,fontSize:10}}>⏭ SKIP</span>}
  </button>
);

export default function App() {
  const [screen,       setScreen]       = useState("public");
  const [pubRound,     setPubRound]     = useState("round64");
  const [adminTab,     setAdminTab]     = useState("odds");
  const [adminRound,   setAdminRound]   = useState("firstfour");
  const [pin,          setPin]          = useState("");
  const [pinErr,       setPinErr]       = useState(false);
  const [saveStatus,   setSaveStatus]   = useState("idle");
  const [importText,   setImportText]   = useState("");
  const [importErr,    setImportErr]    = useState("");
  const [importOk,     setImportOk]     = useState(false);

  // per-round state: odds, results, pool, skipped
  const [odds,    setOdds]    = useState(DEFAULT_ODDS);
  const [results, setResults] = useState({});
  // pools: { firstfour: { "Alice": {underdog_ml:20, first_10:20, tie:10}, ... }, round64: {...}, ... }
  const [pools,   setPools]   = useState({});
  // paid: { firstfour: { "Alice": true }, round64: { "Bob": true } }
  const [paid,    setPaid]    = useState({});
  // skipped rounds
  const [skipped, setSkipped] = useState({});

  const [pForm,   setPForm]   = useState({name:"",underdog_ml:"",first_10:"",tie:""});
  const [editingPerson, setEditingPerson] = useState(null);

  // ── load: GitHub (results/skipped) + localStorage (pools) ──────────────
  const [ghSha, setGhSha] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Load pools from localStorage (private)
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        const d = JSON.parse(raw);
        if (d.pools) setPools(d.pools);
        if (d.paid)  setPaid(d.paid);
      }
    } catch(e) { console.warn("Local load failed",e); }

    // Load results from GitHub (public/shared) - one time on mount only
    ghRead().then(res => {
      if(res) {
        if(res.data?.results) setResults(res.data.results);
        if(res.data?.skipped) setSkipped(p=>({...p,...(res.data.skipped||{})}));
        setGhSha(res.sha);
      }
      setTimeout(()=>setLoaded(true), 100); // slight delay to prevent immediate save
    });
  }, []);

  // Save pools to localStorage (private)
  useEffect(() => {
    if(!loaded) return;
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify({pools,paid}));
    } catch(e) { console.warn("Local save failed",e); }
  }, [pools, loaded]);

  // Manual GitHub sync - only fires when admin clicks Save button
  const syncToGitHub = async () => {
    setSaveStatus("saving");
    try {
      const latest = await ghRead();
      const sha = latest?.sha || ghSha;
      const res = await fetch("/.netlify/functions/gamedata", {
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({data:{results,skipped}, sha})
      });
      if(res.ok) {
        const json = await res.json();
        if(json.sha) setGhSha(json.sha);
        setSaveStatus("saved");
      } else {
        setSaveStatus("error");
      }
    } catch(e) {
      setSaveStatus("error");
    }
    setTimeout(()=>setSaveStatus("idle"),3000);
  };

  // ── helpers ────────────────────────────────────────────────────────────
  const tryLogin     = () => { if(pin===ADMIN_PIN){setScreen("admin");setPinErr(false);setPin("");}else setPinErr(true); };
  const setOddsField = (gid,f,v) => setOdds(p=>({...p,[gid]:{...p[gid],[f]:v}}));
  const toggleResult = (gid,k,v) => setResults(p=>({...p,[gid]:{...p[gid],[k]:p[gid]?.[k]===v?null:v}}));
  const toggleSkip   = (rid) => setSkipped(p=>({...p,[rid]:!p[rid]}));

  const roundPool    = (rid) => pools[rid]||{};
  const setRoundPool = (rid,val) => setPools(p=>({...p,[rid]:val}));

  const savePerson = () => {
    if(!pForm.name.trim()) return;
    const name=pForm.name.trim();
    const rp=roundPool(adminRound);
    setRoundPool(adminRound,{...rp,[name]:{
      underdog_ml: pForm.underdog_ml!==""?parseFloat(pForm.underdog_ml):0,
      first_10:    pForm.first_10!==""?parseFloat(pForm.first_10):0,
      tie:         pForm.tie!==""?parseFloat(pForm.tie):0,
    }});
    setPForm({name:"",underdog_ml:"",first_10:"",tie:""});
    setEditingPerson(null);
  };
  const deletePerson = (name) => {
    const rp={...roundPool(adminRound)};
    delete rp[name];
    setRoundPool(adminRound,rp);
  };
  const togglePaid = (name) => {
    setPaid(p=>({
      ...p,
      [adminRound]:{
        ...(p[adminRound]||{}),
        [name]:!(p[adminRound]||{})[name]
      }
    }));
  };

  const startEdit = (name) => {
    const d=roundPool(adminRound)[name];
    setPForm({name,underdog_ml:d.underdog_ml||"",first_10:d.first_10||"",tie:d.tie||""});
    setEditingPerson(name);
  };

  // ── math (per round) ──────────────────────────────────────────────────
  const getRoundMath = (rid) => {
    try {
      const round = ROUNDS.find(r=>r.id===rid);
      if(!round) return {people:[],bettable:[],numGames:0,poolTotals:{underdog_ml:0,first_10:0,tie:0},perGame:{underdog_ml:0,first_10:0,tie:0},hitCounts:{underdog_ml:0,first_10:0,tie:0},totalIn:0,totalPayouts:0,personPayouts:()=>({})};
      const rp = roundPool(rid)||{};
      const people = Object.entries(rp);
      const bettable = (round.games||[]).filter(g=>!g.nobet);
      const numGames = bettable.length;
      const poolTotals = BET_KEYS.reduce((a,k)=>{a[k]=people.reduce((s,[,d])=>s+(d[k]||0),0);return a;},{});
      const numBettable = BET_KEYS.reduce((a,k)=>{
        a[k]=bettable.filter(g=>{const o=(odds[g.id]||{})[k]; return o && o!=="NO BET";}).length||numGames;
        return a;
      },{});
      const perGame = BET_KEYS.reduce((a,k)=>{a[k]=poolTotals[k]>0&&numBettable[k]>0?poolTotals[k]/numBettable[k]:0;return a;},{});
      const hitCounts = BET_KEYS.reduce((a,k)=>{a[k]=bettable.filter(g=>results[g.id]?.[k]===true).length;return a;},{});
      const totalIn = BET_KEYS.reduce((s,k)=>s+poolTotals[k],0);

      const personPayouts = (name) => {
        const d=rp[name]; if(!d) return {};
        return BET_KEYS.reduce((acc,k)=>{
          const share=poolTotals[k]>0?(d[k]||0)/poolTotals[k]:0;
          let win=0;
          bettable.forEach(g=>{
            if(results[g.id]?.[k]===true){
              const p=calcPayout(perGame[k],(odds[g.id]||{})[k]);
              if(p) win+=p*share;
            }
          });
          acc[k]={put_in:d[k]||0,share:(share*100).toFixed(1),winnings:parseFloat(win.toFixed(2))};
          return acc;
        },{});
      };

      const totalPayouts = people.reduce((s,[n])=>{
        const po=personPayouts(n);
        return s+BET_KEYS.reduce((ss,k)=>ss+(po[k]?.winnings||0),0);
      },0);

      return {people,bettable,numGames,poolTotals,perGame,hitCounts,totalIn,totalPayouts,personPayouts};
    } catch(e) {
      console.error("getRoundMath error",e);
      return {people:[],bettable:[],numGames:0,poolTotals:{underdog_ml:0,first_10:0,tie:0},perGame:{underdog_ml:0,first_10:0,tie:0},hitCounts:{underdog_ml:0,first_10:0,tie:0},totalIn:0,totalPayouts:0,personPayouts:()=>({})};
    }
  };

  // ── exports ────────────────────────────────────────────────────────────
  const dl = (content,filename,type) => {
    const a=document.createElement("a");
    a.href=URL.createObjectURL(new Blob([content],{type}));
    a.download=filename; a.click();
  };
  const exportCSV = () => {
    const rid=adminRound;
    const {people,personPayouts}=getRoundMath(rid);
    const roundLabel=ROUNDS.find(r=>r.id===rid)?.short||rid;
    const rows=[
      [`Round: ${roundLabel}`],
      ["Name","Dog ML ($)","First to 10 ($)","Tie ($)","Total In ($)","Winnings ($)","Net ($)"],
      ...people.map(([name,d])=>{
        const po=personPayouts(name);
        const tin=BET_KEYS.reduce((s,k)=>s+(d[k]||0),0);
        const twin=BET_KEYS.reduce((s,k)=>s+(po[k]?.winnings||0),0);
        return [name,d.underdog_ml||0,d.first_10||0,d.tie||0,tin.toFixed(2),twin.toFixed(2),(twin-tin).toFixed(2)];
      })
    ].map(r=>r.join(",")).join("\n");
    dl(rows,`bracket_bookie_${roundLabel}.csv`,"text/csv");
  };
  const exportJSON = () => dl(JSON.stringify({results,pools,skipped},null,2),"bracket_bookie_backup.json","application/json");
  const importData = () => {
    try {
      const d=JSON.parse(importText);
      if(!d.results && !d.pools) throw new Error();
      setResults(d.results||{}); setPools(d.pools||{}); setSkipped(d.skipped||{});
      setImportOk(true); setImportErr(""); setImportText("");
      setTimeout(()=>setImportOk(false),2500);
    } catch { setImportErr("Invalid — paste the full JSON backup contents."); }
  };
  const handleFile = (e) => {
    const f=e.target.files[0]; if(!f) return;
    const r=new FileReader(); r.onload=ev=>setImportText(ev.target.result); r.readAsText(f);
  };

  const SavePill = () => {
    const map={saving:["⏳","#f59e0b","Syncing…"],saved:["☁️","#16a34a","Synced"],error:["⚠️","#dc2626","Sync Error"],idle:["☁️","#64748b","Auto-sync"]};
    const [icon,color,label]=map[saveStatus]||map.idle;
    return <span style={{fontSize:10,color,fontWeight:700,letterSpacing:1,display:"flex",alignItems:"center",gap:4}}>{icon} {label}</span>;
  };

  // ── round selector (used in admin tabs) ───────────────────────────────
  const RoundSelector = ({onChange}) => (
    <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap",alignItems:"center"}}>
      <span style={{fontSize:10,color:"#94a3b8",letterSpacing:2,fontWeight:700}}>ROUND:</span>
      {ROUNDS.map(r=>(
        <RoundBtn key={r.id} active={adminRound===r.id} skipped={skipped[r.id]}
          onClick={()=>{setAdminRound(r.id);setEditingPerson(null);setPForm({name:"",underdog_ml:"",first_10:"",tie:""});onChange&&onChange(r.id);}}>
          {r.label}
        </RoundBtn>
      ))}
    </div>
  );

  // ── game card renderers ────────────────────────────────────────────────
  const pubCard = (game) => {
    const go=odds[game.id]||{}, res=results[game.id]||{};
    if (game.nobet) return (
      <div key={game.id} style={{...PUB_CARD,opacity:0.5}}>
        <div style={{padding:"14px 18px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
          <div>
            <div style={{fontSize:10,color:"#94a3b8",letterSpacing:2,marginBottom:4}}>{game.time} ET · {game.tv} · {game.region.toUpperCase()}</div>
            <div style={{fontWeight:800,fontSize:17,color:"#0f172a"}}>#{game.seed_away} {game.away} <span style={{color:"#94a3b8",fontWeight:400,fontSize:13,margin:"0 10px"}}>vs</span> #{game.seed_home} {game.home}</div>
          </div>
          <span style={{background:"#fef2f2",color:"#dc2626",border:"2px solid #dc2626",borderRadius:8,padding:"6px 14px",fontWeight:800,fontSize:13}}>🚫 NO BET — NY Restriction</span>
        </div>
      </div>
    );
    return (
      <div key={game.id} style={PUB_CARD}>
        <div style={{padding:"14px 18px 12px",borderBottom:"1px solid #e2e8f0"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8,marginBottom:6}}>
            <div style={{fontSize:10,color:"#94a3b8",letterSpacing:2}}>{game.time} ET · {game.tv} · {game.region.toUpperCase()}</div>
            {go.dog?<span style={{background:"#fef3c7",color:"#92400e",border:"1.5px solid #d97706",borderRadius:20,fontSize:11,padding:"2px 10px",fontWeight:700}}>🐶 {go.dog}</span>
                   :<span style={{background:"#f1f5f9",color:"#94a3b8",border:"1.5px solid #cbd5e1",borderRadius:20,fontSize:10,padding:"2px 8px"}}>Dog TBD</span>}
          </div>
          <div style={{fontWeight:800,fontSize:17,color:"#0f172a",lineHeight:1.3}}>
            <span style={{color:"#334155"}}>#{game.seed_away} {game.away}</span>
            <span style={{color:"#94a3b8",fontWeight:400,fontSize:13,margin:"0 10px"}}>vs</span>
            <span style={{color:"#334155"}}>#{game.seed_home} {game.home}</span>
          </div>
        </div>
        <div style={{padding:"14px 18px",display:"flex",gap:10,flexWrap:"wrap"}}>
          {BET_KEYS.map(k=>{
            const val=fmt(go[k]),hit=res[k];
            const bg=hit===true?"#f0fdf4":hit===false?"#fef2f2":"#f8fafc";
            const bdr=hit===true?"#16a34a":hit===false?"#dc2626":"#e2e8f0";
            const nc=hit===true?"#15803d":hit===false?"#b91c1c":val?BET_COLOR[k]:"#cbd5e1";
            return (
              <div key={k} style={{flex:"1 1 120px",minWidth:110,background:bg,border:`2px solid ${bdr}`,borderRadius:10,padding:"12px 14px"}}>
                <div style={{fontSize:10,color:"#64748b",letterSpacing:1,marginBottom:5,fontWeight:600}}>{BET_EMOJI[k]} {BET_LABELS[k]}</div>
                <div style={{fontSize:28,fontWeight:900,color:nc,lineHeight:1}}>{val||"—"}</div>
                {hit===true  &&<div style={{fontSize:9,color:"#16a34a",marginTop:5,fontWeight:700}}>✅ HIT</div>}
                {hit===false &&<div style={{fontSize:9,color:"#dc2626",marginTop:5,fontWeight:700}}>❌ MISS</div>}
                {!hit&&val   &&<div style={{fontSize:9,color:"#94a3b8",marginTop:5}}>Pending</div>}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const adminCard = (game, perGame) => {
    const go=odds[game.id]||{}, res=results[game.id]||{};
    return (
      <div key={game.id} style={ADMIN_CARD}>
        <div style={{padding:"12px 16px 8px",borderBottom:"1px solid #f1f5f9"}}>
          <div style={{fontSize:9,color:"#94a3b8",letterSpacing:2,marginBottom:3}}>{game.time} ET · {game.tv} · {game.region}</div>
          <div style={{fontWeight:800,fontSize:15,color:"#0f172a"}}>
            #{game.seed_away} {game.away}
            <span style={{color:"#94a3b8",fontWeight:400,fontSize:12,margin:"0 8px"}}>vs</span>
            #{game.seed_home} {game.home}
          </div>
        </div>
        <div style={{padding:"10px 16px 6px",display:"flex",flexWrap:"wrap",gap:10}}>
          <div style={{flex:"1 1 160px"}}>
            <div style={FLD_LBL}>🐶 UNDERDOG</div>
            <select value={go.dog||""} onChange={e=>setOddsField(game.id,"dog",e.target.value)} style={FIELD}>
              <option value="">Select...</option>
              <option value={game.away}>#{game.seed_away} {game.away}</option>
              <option value={game.home}>#{game.seed_home} {game.home}</option>
            </select>
          </div>
          {BET_KEYS.map(k=>(
            <div key={k} style={{flex:"1 1 90px"}}>
              <div style={FLD_LBL}>{BET_EMOJI[k]} {BET_LABELS[k]}</div>
              <input value={go[k]||""} onChange={e=>setOddsField(game.id,k,e.target.value)} placeholder="+350"
                style={{...FIELD,color:go[k]?BET_COLOR[k]:"#94a3b8",fontWeight:go[k]?700:400,borderColor:go[k]?BET_COLOR[k]:"#cbd5e1"}}/>
            </div>
          ))}
        </div>
        {BET_KEYS.some(k=>perGame[k]>0)&&(
          <div style={{padding:"2px 16px 8px",display:"flex",gap:14,flexWrap:"wrap"}}>
            {BET_KEYS.map(k=>{
              if(!perGame[k]) return null;
              const ret=calcPayout(perGame[k],go[k]);
              return <span key={k} style={{fontSize:11,color:"#475569"}}>{BET_EMOJI[k]} Bet <b style={{color:BET_COLOR[k]}}>${perGame[k].toFixed(2)}</b>{ret&&<span style={{color:"#16a34a"}}> → ${ret.toFixed(2)}</span>}</span>;
            })}
          </div>
        )}
        <div style={{padding:"8px 16px 12px",borderTop:"1px solid #f8fafc",display:"flex",gap:10,flexWrap:"wrap",alignItems:"center"}}>
          <span style={{fontSize:9,color:"#94a3b8",letterSpacing:2,fontWeight:600}}>RESULT:</span>
          {BET_KEYS.map(k=>{
            const r=res[k];
            return (
              <div key={k} style={{display:"flex",alignItems:"center",gap:5}}>
                <span style={{fontSize:11}}>{BET_EMOJI[k]}</span>
                <button onClick={()=>toggleResult(game.id,k,true)}  style={{...TOG,background:r===true ?"#16a34a":"#f0fdf4",color:r===true ?"#fff":"#16a34a",borderColor:"#16a34a"}}>✅ HIT</button>
                <button onClick={()=>toggleResult(game.id,k,false)} style={{...TOG,background:r===false?"#dc2626":"#fef2f2",color:r===false?"#fff":"#dc2626",borderColor:"#dc2626"}}>❌ MISS</button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ── PUBLIC ─────────────────────────────────────────────────────────────
  if (screen==="public") {
    const activeRounds = ROUNDS.filter(r=>r.active && !skipped[r.id]);
    const curRound = activeRounds.find(r=>r.id===pubRound) || activeRounds[0];
    const games   = curRound?.games||[];
    const grouped = groupBy(games,g=>g.date);
    return (
      <div style={ROOT}>
        <div style={HEADER}>
          <div style={{flex:1}}>
            <div style={EYEBROW}>2026 NCAA TOURNAMENT</div>
            <div style={H1}>🏆 Bracket Bookie</div>
          </div>
          <button onClick={()=>setScreen("admin-login")} style={ICON_BTN} title="Admin">⚙️</button>
        </div>
        <div style={{background:"#fff",borderBottom:"1px solid #e2e8f0",display:"flex",paddingLeft:8,flexWrap:"wrap"}}>
          {activeRounds.map(r=>(
            <PubTab key={r.id} active={pubRound===r.id} onClick={()=>setPubRound(r.id)}>{r.label}</PubTab>
          ))}
        </div>
        <div style={CONTENT}>
          {Object.entries(grouped).map(([date,gs])=>(
            <div key={date} style={{marginBottom:32}}>
              <div style={DATE_HDR}>{date}</div>
              {gs.map(pubCard)}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── ADMIN LOGIN ────────────────────────────────────────────────────────
  if (screen==="admin-login") return (
    <div style={{...ROOT,background:"#f1f5f9",alignItems:"center",justifyContent:"center"}}>
      <div style={{maxWidth:320,width:"100%",padding:32,background:"#fff",borderRadius:16,boxShadow:"0 4px 24px rgba(0,0,0,0.08)"}}>
        <div style={{fontSize:10,letterSpacing:4,color:"#f59e0b",fontWeight:700,marginBottom:4}}>ADMIN ACCESS</div>
        <div style={{fontSize:22,fontWeight:900,color:"#0f172a",marginBottom:20}}>Enter PIN</div>
        <input type="password" placeholder="••••" value={pin} onChange={e=>setPin(e.target.value)} onKeyDown={e=>e.key==="Enter"&&tryLogin()} style={{...FIELD,marginBottom:8}}/>
        {pinErr&&<div style={{color:"#dc2626",fontSize:12,marginBottom:8}}>Wrong PIN.</div>}
        <button onClick={tryLogin} style={{...BTN_NAVY,marginBottom:10}}>ENTER</button>
        <button onClick={()=>setScreen("public")} style={BTN_OUTLINE}>← Back to board</button>
      </div>
    </div>
  );

  // ── ADMIN ──────────────────────────────────────────────────────────────
  const curRoundObj  = ROUNDS.find(r=>r.id===adminRound)||ROUNDS[0];
  const isSkipped    = skipped[adminRound];
  const {people,numGames,poolTotals,perGame,hitCounts,totalIn,totalPayouts,personPayouts} = getRoundMath(adminRound);
  const adminGames   = curRoundObj.games;
  const adminGrouped = groupBy(adminGames,g=>g.date);

  return (
    <div style={{...ROOT,background:"#f1f5f9"}}>
      <div style={{...HEADER,background:"#1e3a5f",borderBottom:"3px solid #f59e0b"}}>
        <div style={{flex:1}}>
          <div style={{...EYEBROW,color:"#93c5fd"}}>ADMIN · 2026 NCAA</div>
          <div style={{...H1,color:"#fff"}}>⚙️ Bracket Bookie</div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <SavePill/>
          <button onClick={()=>setScreen("public")} style={{...ICON_BTN,color:"#fff",border:"1px solid rgba(255,255,255,0.2)"}}>👁</button>
        </div>
      </div>

      <div style={{background:"#fffbeb",borderBottom:"2px solid #f59e0b",padding:"10px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
        <div style={{fontSize:12,color:"#92400e",fontWeight:600}}>
          📡 Mark results then hit <b>Sync to Site</b> to push to all devices.
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <SavePill/>
          <button onClick={syncToGitHub} style={{...BTN_SM,background:"#f59e0b",color:"#1e3a5f",border:"none",fontWeight:900}}>📡 Sync to Site</button>
          <button onClick={exportJSON} style={{...BTN_SM,background:"#1e3a5f",color:"#fff",border:"none"}}>⬇️ Backup</button>
          <button onClick={exportCSV}  style={{...BTN_SM,background:"#15803d",color:"#fff",border:"none"}}>⬇️ CSV</button>
        </div>
      </div>

      <div style={{background:"#1e3a5f",display:"flex",paddingLeft:8,gap:2,flexWrap:"wrap"}}>
        <NavTab active={adminTab==="odds"}    onClick={()=>setAdminTab("odds")}>📋 ODDS & RESULTS</NavTab>
        <NavTab active={adminTab==="money"}   onClick={()=>setAdminTab("money")}>💰 MONEY</NavTab>
        <NavTab active={adminTab==="payouts"} onClick={()=>setAdminTab("payouts")}>💸 PAYOUTS</NavTab>
        <NavTab active={adminTab==="restore"} onClick={()=>setAdminTab("restore")}>🔁 RESTORE</NavTab>
      </div>

      <div style={{...CONTENT,maxWidth:920}}>

        {/* ══ ODDS ════════════════════════════════════════════════════════ */}
        {adminTab==="odds"&&(
          <>
            <RoundSelector/>

            {isSkipped?(
              <div style={{background:"#fef2f2",border:"2px solid #fca5a5",borderRadius:12,padding:"24px",textAlign:"center",marginBottom:20}}>
                <div style={{fontSize:32,marginBottom:8}}>⏭</div>
                <div style={{fontSize:18,fontWeight:800,color:"#dc2626",marginBottom:6}}>{curRoundObj.label} — SKIPPED</div>
                <div style={{fontSize:13,color:"#64748b",marginBottom:16}}>You marked this round as skipped. No bets or pool for this round.</div>
                <button onClick={()=>toggleSkip(adminRound)} style={{...BTN_SM,background:"#1e3a5f",color:"#fff",border:"none",padding:"10px 24px",fontSize:13}}>↩ Undo Skip</button>
              </div>
            ):(
              <>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"wrap",gap:8}}>
                  <div style={{fontSize:11,color:"#64748b"}}>{curRoundObj.dates} · {numGames} bettable games</div>
                  <button onClick={()=>toggleSkip(adminRound)}
                    style={{...BTN_SM,background:"#fef2f2",color:"#dc2626",border:"2px solid #fca5a5",padding:"6px 16px"}}>
                    ⏭ Skip This Round
                  </button>
                </div>

                {BET_KEYS.some(k=>poolTotals[k]>0)&&numGames>0&&(
                  <div style={{background:"#fff",border:"2px solid #16a34a",borderRadius:12,padding:"14px 18px",marginBottom:20}}>
                    <div style={{fontSize:10,letterSpacing:3,color:"#16a34a",fontWeight:700,marginBottom:10}}>💡 BET SIZING — {numGames} GAMES</div>
                    <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                      {BET_KEYS.map(k=>{
                        if(!poolTotals[k]) return null;
                        const per=perGame[k];
                        return (
                          <div key={k} style={{flex:"1 1 150px",background:BET_LIGHT[k],border:`2px solid ${BET_COLOR[k]}`,borderRadius:10,padding:"10px 14px"}}>
                            <div style={{fontSize:10,color:BET_COLOR[k],fontWeight:600,marginBottom:3}}>{BET_EMOJI[k]} {BET_LABELS[k]}</div>
                            <div style={{fontSize:11,color:"#475569",marginBottom:4}}><b>${poolTotals[k].toFixed(0)}</b> ÷ {numPerKey[k]} games</div>
                            <div style={{fontSize:24,fontWeight:900,color:BET_COLOR[k]}}>${per.toFixed(2)}<span style={{fontSize:11,color:"#64748b"}}>/game</span></div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {adminGames.length===0
                  ?<div style={{color:"#94a3b8",fontSize:14,padding:"20px 0"}}>No games added for this round yet.</div>
                  :Object.entries(adminGrouped).map(([date,gs])=>(
                    <div key={date} style={{marginBottom:20}}>
                      <div style={DATE_HDR}>{date}</div>
                      {gs.map(g=>adminCard(g,perGame))}
                    </div>
                  ))
                }
              </>
            )}
          </>
        )}

        {/* ══ MONEY ═══════════════════════════════════════════════════════ */}
        {adminTab==="money"&&(
          <>
            <RoundSelector/>

            {isSkipped?(
              <div style={{background:"#fef2f2",border:"2px solid #fca5a5",borderRadius:12,padding:"24px",textAlign:"center"}}>
                <div style={{fontSize:32,marginBottom:8}}>⏭</div>
                <div style={{fontSize:16,fontWeight:800,color:"#dc2626"}}>{curRoundObj.label} is skipped — no pool for this round.</div>
              </div>
            ):(
              <>
                <div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:12,padding:"16px 18px",marginBottom:20,boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}>
                  <div style={{fontSize:10,letterSpacing:3,color:"#64748b",fontWeight:700,marginBottom:4}}>POOL · {curRoundObj.label.toUpperCase()}</div>
                  <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                    {BET_KEYS.map(k=>(
                      <div key={k} style={{flex:"1 1 120px",background:BET_LIGHT[k],border:`2px solid ${BET_COLOR[k]}`,borderRadius:10,padding:"12px 14px"}}>
                        <div style={{fontSize:10,color:BET_COLOR[k],fontWeight:600,marginBottom:3}}>{BET_EMOJI[k]} {BET_LABELS[k]}</div>
                        <div style={{fontSize:30,fontWeight:900,color:BET_COLOR[k]}}>${poolTotals[k].toFixed(0)}</div>
                        <div style={{fontSize:10,color:"#64748b",marginTop:3}}>÷{numPerKey[k]} = <b>${perGame[k].toFixed(2)}/game</b></div>
                      </div>
                    ))}
                    <div style={{flex:"1 1 120px",background:"#f0fdf4",border:"2px solid #16a34a",borderRadius:10,padding:"12px 14px"}}>
                      <div style={{fontSize:10,color:"#16a34a",fontWeight:600,marginBottom:3}}>💵 TOTAL IN</div>
                      <div style={{fontSize:30,fontWeight:900,color:"#15803d"}}>${totalIn.toFixed(0)}</div>
                      <div style={{fontSize:10,color:"#64748b",marginTop:3}}>{people.length} bettor{people.length!==1?"s":""}</div>
                    </div>
                  </div>
                </div>

                <div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:12,padding:"16px 18px",marginBottom:20,boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}>
                  <div style={SEC_LABEL}>{editingPerson?`EDITING: ${editingPerson.toUpperCase()}`:`ADD BETTOR — ${curRoundObj.short}`}</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:10,marginBottom:12}}>
                    <div style={{flex:"1 1 150px"}}>
                      <div style={FLD_LBL}>NAME</div>
                      <input value={pForm.name} onChange={e=>setPForm(f=>({...f,name:e.target.value}))} placeholder="e.g. Mike" style={FIELD} disabled={!!editingPerson}/>
                    </div>
                    {BET_KEYS.map(k=>(
                      <div key={k} style={{flex:"1 1 100px"}}>
                        <div style={FLD_LBL}>{BET_EMOJI[k]} {BET_LABELS[k]} ($)</div>
                        <input type="number" min="0" value={pForm[k]} onChange={e=>setPForm(f=>({...f,[k]:e.target.value}))} placeholder="0"
                          style={{...FIELD,borderColor:pForm[k]?BET_COLOR[k]:"#cbd5e1",color:pForm[k]?BET_COLOR[k]:"#0f172a",fontWeight:pForm[k]?700:400}}/>
                      </div>
                    ))}
                  </div>
                  <div style={{display:"flex",gap:8}}>
                    <button onClick={savePerson} disabled={!pForm.name.trim()} style={{...BTN_NAVY,flex:1,opacity:!pForm.name.trim()?0.4:1}}>
                      {editingPerson?"💾 UPDATE":"➕ ADD BETTOR"}
                    </button>
                    {editingPerson&&<button onClick={()=>{setEditingPerson(null);setPForm({name:"",underdog_ml:"",first_10:"",tie:""});}} style={{...BTN_OUTLINE,width:"auto",padding:"0 18px"}}>Cancel</button>}
                  </div>
                </div>

                {people.length>0&&(
                  <div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:12,overflow:"hidden",boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}>
                    <div style={{padding:"12px 18px 8px",borderBottom:"1px solid #e2e8f0",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <div style={SEC_LABEL}>BETTORS — {curRoundObj.label.toUpperCase()}</div>
                      <button onClick={exportCSV} style={{...BTN_SM,background:"#1e3a5f",color:"#fff",border:"none"}}>⬇️ Export CSV</button>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"1.4fr 1fr 1fr 1fr 80px",background:"#f8fafc",padding:"8px 18px",fontSize:10,letterSpacing:2,color:"#94a3b8",fontWeight:700,gap:8}}>
                      <div>NAME</div>{BET_KEYS.map(k=><div key={k}>{BET_EMOJI[k]} {BET_LABELS[k].toUpperCase()}</div>)}<div></div>
                    </div>
                    {people.map(([name,d],i)=>(
                      <div key={name} style={{borderTop:"1px solid #f1f5f9",display:"grid",gridTemplateColumns:"1.4fr 1fr 1fr 1fr 80px",padding:"12px 18px",alignItems:"center",gap:8,background:i%2===0?"#fff":"#fafafa"}}>
                        <div style={{fontWeight:700,fontSize:14}}>{name}</div>
                        {BET_KEYS.map(k=><div key={k}>{d[k]>0?<span style={{color:BET_COLOR[k],fontWeight:700}}>${d[k].toFixed(0)}</span>:<span style={{color:"#cbd5e1"}}>—</span>}</div>)}
                        <div style={{display:"flex",gap:5}}>
                          <button onClick={()=>startEdit(name)} style={MICRO}>edit</button>
                          <button onClick={()=>deletePerson(name)} style={{...MICRO,color:"#dc2626",borderColor:"#fecaca"}}>del</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        )}

        {/* ══ PAYOUTS ═════════════════════════════════════════════════════ */}
        {adminTab==="payouts"&&(
          <>
            <RoundSelector/>

            {isSkipped?(
              <div style={{background:"#fef2f2",border:"2px solid #fca5a5",borderRadius:12,padding:"24px",textAlign:"center"}}>
                <div style={{fontSize:16,fontWeight:800,color:"#dc2626"}}>{curRoundObj.label} is skipped — no payouts.</div>
              </div>
            ):(
              <>
                <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:24}}>
                  {BET_KEYS.map(k=>{
                    const hc=hitCounts[k];
                    const paid=people.reduce((s,[name])=>{const po=personPayouts(name);return s+(po[k]?.winnings||0);},0);
                    return (
                      <div key={k} style={{flex:"1 1 140px",background:"#fff",border:`2px solid ${BET_COLOR[k]}`,borderRadius:12,padding:"14px 16px"}}>
                        <div style={{fontSize:10,color:BET_COLOR[k],fontWeight:700,marginBottom:4}}>{BET_EMOJI[k]} {BET_LABELS[k].toUpperCase()}</div>
                        <div style={{fontSize:11,color:"#64748b",marginBottom:6}}>Pool: <b style={{color:"#0f172a"}}>${poolTotals[k].toFixed(0)}</b></div>
                        <div style={{fontSize:22,fontWeight:900,color:hc>0?"#15803d":"#94a3b8"}}>{hc} hit{hc!==1?"s":""}</div>
                        {paid>0&&<div style={{fontSize:12,color:"#dc2626",fontWeight:700,marginTop:4}}>Pay out: ${paid.toFixed(2)}</div>}
                      </div>
                    );
                  })}
                  <div style={{flex:"1 1 140px",background:"#fff",border:"2px solid #1e3a5f",borderRadius:12,padding:"14px 16px"}}>
                    <div style={{fontSize:10,color:"#1e3a5f",fontWeight:700,marginBottom:4}}>💵 TOTAL PAYOUTS</div>
                    <div style={{fontSize:11,color:"#64748b",marginBottom:6}}>Total in: <b>${totalIn.toFixed(0)}</b></div>
                    <div style={{fontSize:22,fontWeight:900,color:"#dc2626"}}>${totalPayouts.toFixed(2)}</div>
                  </div>
                </div>

                {people.length===0
                  ?<div style={{color:"#94a3b8",fontSize:14,padding:"20px 0"}}>No bettors yet — add them in the Money tab.</div>
                  :(
                    <div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:12,overflow:"hidden",boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}>
                      <div style={{padding:"12px 18px 8px",borderBottom:"1px solid #e2e8f0",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        <div style={SEC_LABEL}>WHO GETS PAID — {curRoundObj.label.toUpperCase()}</div>
                        <button onClick={exportCSV} style={{...BTN_SM,background:"#1e3a5f",color:"#fff",border:"none"}}>⬇️ Export CSV</button>
                      </div>
                      {people.map(([name,d],i)=>{
                        const po=personPayouts(name);
                        const tin=BET_KEYS.reduce((s,k)=>s+(d[k]||0),0);
                        const twin=BET_KEYS.reduce((s,k)=>s+(po[k]?.winnings||0),0);
                        const net=twin-tin;
                        return (
                          <div key={name} style={{borderTop:"1px solid #f1f5f9",padding:"14px 18px",background:(paid[adminRound]||{})[name]?"#f0fdf4":i%2===0?"#fff":"#fafafa",opacity:(paid[adminRound]||{})[name]?0.7:1}}>
                            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8,marginBottom:10}}>
                              <div style={{display:"flex",alignItems:"center",gap:10}}>
                                <div style={{fontWeight:800,fontSize:16,color:(paid[adminRound]||{})[name]?"#94a3b8":"#0f172a",textDecoration:(paid[adminRound]||{})[name]?"line-through":"none"}}>{name}</div>
                                {(paid[adminRound]||{})[name]&&<span style={{fontSize:11,color:"#16a34a",fontWeight:700}}>✅ PAID</span>}
                              </div>
                              <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                                <span style={{fontSize:13,color:"#64748b"}}>Sent in: <b style={{color:"#0f172a"}}>${tin.toFixed(2)}</b></span>
                                {twin>0
                                  ?<span style={{background:"#f0fdf4",color:"#15803d",border:"2px solid #16a34a",borderRadius:8,padding:"4px 12px",fontWeight:800,fontSize:14}}>💸 Pay: ${twin.toFixed(2)} <span style={{fontSize:11,fontWeight:600}}>({net>=0?"+":""}${net.toFixed(2)} net)</span></span>
                                  :<span style={{background:"#f8fafc",color:"#94a3b8",border:"1px solid #e2e8f0",borderRadius:8,padding:"4px 12px",fontSize:12}}>⏳ Pending</span>}
                                <button onClick={()=>togglePaid(name)}
                                  style={{...BTN_SM,background:(paid[adminRound]||{})[name]?"#f1f5f9":"#1e3a5f",color:(paid[adminRound]||{})[name]?"#64748b":"#fff",border:"none",padding:"6px 14px"}}>
                                  {(paid[adminRound]||{})[name]?"↩ Unpay":"💰 Mark Paid"}
                                </button>
                              </div>
                            </div>
                            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                              {BET_KEYS.map(k=>{
                                if(!d[k]) return null;
                                const info=po[k],hc=hitCounts[k];
                                return (
                                  <div key={k} style={{flex:"1 1 160px",background:BET_LIGHT[k],border:`1.5px solid ${BET_COLOR[k]}`,borderRadius:8,padding:"8px 12px",fontSize:11}}>
                                    <span style={{color:BET_COLOR[k],fontWeight:700}}>{BET_EMOJI[k]} {BET_LABELS[k]}</span>
                                    <div style={{color:"#475569",marginTop:2}}>In: <b>${d[k].toFixed(0)}</b> · {info.share}% of pool</div>
                                    {hc>0
                                      ?<div style={{color:"#15803d",fontWeight:700,marginTop:2}}>{hc} hit{hc>1?"s":""} → +${info.winnings.toFixed(2)}</div>
                                      :<div style={{color:"#94a3b8",marginTop:2}}>No hits yet</div>}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )
                }
              </>
            )}
          </>
        )}

        {/* ══ RESTORE ═════════════════════════════════════════════════════ */}
        {adminTab==="restore"&&(
          <div style={{maxWidth:560}}>
            <div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:12,padding:"20px 22px",boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}>
              <div style={SEC_LABEL}>RESTORE FROM BACKUP</div>
              <div style={{fontSize:13,color:"#475569",marginBottom:16,lineHeight:1.7}}>
                Upload your <b>bracket_bookie_backup.json</b> file to restore all odds, bettors, and results.
              </div>
              <div style={{marginBottom:14}}>
                <div style={FLD_LBL}>UPLOAD .JSON FILE</div>
                <input type="file" accept=".json" onChange={handleFile} style={{...FIELD,padding:"8px",color:"#475569",cursor:"pointer"}}/>
              </div>
              <div style={{textAlign:"center",fontSize:12,color:"#94a3b8",margin:"10px 0"}}>— or paste file contents —</div>
              <div style={{marginBottom:14}}>
                <textarea value={importText} onChange={e=>{setImportText(e.target.value);setImportErr("");setImportOk(false);}}
                  placeholder='{ "odds": {}, "results": {}, "pools": {}, "skipped": {} }' rows={5}
                  style={{...FIELD,resize:"vertical",fontFamily:"monospace",fontSize:11,lineHeight:1.5}}/>
              </div>
              {importErr&&<div style={{color:"#dc2626",fontSize:12,marginBottom:10,background:"#fef2f2",border:"1px solid #fecaca",borderRadius:6,padding:"8px 12px"}}>{importErr}</div>}
              {importOk &&<div style={{color:"#16a34a",fontSize:12,marginBottom:10,background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:6,padding:"8px 12px"}}>✅ Restored! All your data is back.</div>}
              <div style={{background:"#fff7ed",border:"1px solid #fcd34d",borderRadius:8,padding:"10px 12px",marginBottom:14,fontSize:12,color:"#92400e"}}>
                ⚠️ This will overwrite your current data. Download a backup first if needed.
              </div>
              <button onClick={importData} disabled={!importText.trim()}
                style={{...BTN_NAVY,opacity:!importText.trim()?0.4:1}}>⬆️ RESTORE BACKUP</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── styles ─────────────────────────────────────────────────────────────────
const ROOT       = {minHeight:"100vh",background:"#f1f5f9",color:"#0f172a",fontFamily:"'DM Mono','Courier New',monospace",display:"flex",flexDirection:"column"};
const HEADER     = {background:"#0f172a",borderBottom:"3px solid #f59e0b",padding:"14px 20px",display:"flex",alignItems:"center",gap:12};
const EYEBROW    = {fontSize:9,letterSpacing:4,color:"#64748b",fontWeight:700};
const H1         = {fontSize:20,fontWeight:900,color:"#fff",marginTop:2,lineHeight:1.1};
const CONTENT    = {maxWidth:860,margin:"0 auto",padding:"22px 16px",width:"100%",boxSizing:"border-box"};
const DATE_HDR   = {fontSize:10,letterSpacing:4,color:"#f59e0b",fontWeight:700,marginBottom:12,paddingBottom:8,borderBottom:"2px solid #e2e8f0"};
const PUB_CARD   = {background:"#fff",border:"1px solid #e2e8f0",borderRadius:14,marginBottom:12,overflow:"hidden",boxShadow:"0 2px 8px rgba(0,0,0,0.04)"};
const ADMIN_CARD = {background:"#fff",border:"1px solid #e2e8f0",borderRadius:12,marginBottom:10,overflow:"hidden",boxShadow:"0 1px 4px rgba(0,0,0,0.04)"};
const SEC_LABEL  = {fontSize:10,letterSpacing:4,color:"#64748b",fontWeight:700,marginBottom:10};
const FLD_LBL    = {fontSize:10,color:"#64748b",letterSpacing:1,marginBottom:5,fontWeight:600};
const FIELD      = {width:"100%",boxSizing:"border-box",background:"#f8fafc",border:"1.5px solid #cbd5e1",borderRadius:7,color:"#0f172a",padding:"9px 12px",fontFamily:"'DM Mono','Courier New',monospace",fontSize:13,outline:"none"};
const BTN_NAVY   = {width:"100%",padding:"11px 0",borderRadius:8,border:"none",background:"#1e3a5f",color:"#fff",fontFamily:"'DM Mono','Courier New',monospace",fontSize:13,fontWeight:900,letterSpacing:2,cursor:"pointer"};
const BTN_OUTLINE= {display:"block",width:"100%",padding:"10px 0",borderRadius:8,border:"2px solid #1e3a5f",background:"none",color:"#1e3a5f",fontFamily:"'DM Mono','Courier New',monospace",fontSize:12,fontWeight:700,cursor:"pointer"};
const BTN_SM     = {padding:"6px 14px",borderRadius:7,fontFamily:"'DM Mono','Courier New',monospace",fontSize:11,fontWeight:700,cursor:"pointer"};
const TOG        = {padding:"4px 10px",borderRadius:6,border:"2px solid",fontFamily:"'DM Mono','Courier New',monospace",fontSize:10,fontWeight:700,cursor:"pointer",letterSpacing:1};
const MICRO      = {padding:"3px 9px",borderRadius:5,border:"1.5px solid #e2e8f0",background:"#f8fafc",color:"#64748b",fontFamily:"inherit",fontSize:10,fontWeight:600,cursor:"pointer"};
const ICON_BTN   = {background:"none",border:"1px solid rgba(255,255,255,0.2)",borderRadius:8,color:"#94a3b8",fontSize:18,width:38,height:38,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"};
