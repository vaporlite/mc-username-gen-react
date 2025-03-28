import React, { useState } from 'react';
import GenerateBtn from './components/generate_btn';
import './App.css';

let apiUrl = 'https://api.mojang.com/users/profiles/minecraft/'
const generateRandomUsernames = (count: number) => {
  const start = ["cyber","key","mac","drain","larp","dark","eth","scar","grim","void","hex","null","crypt","glitch","fatal","zero","shadow","rage","bit","net","anon","pwn","fatal","toxic","ghost","silent","phantom","hack","nuke","frost","acid","alpha","async","binary","blade","blitz","bomb","byte","chaos","click","code","core","crash","crit","crow","cryo","cyber","dead","death","decay","demon","dev","dig","digi","doom","edge","error","evil","exploit","fatal","flaw","force","glow","grid","grim","hash","hell","init","iron","krypt","leak","lore","low","mal","mem","meta","nano","null","pain","panic","pixel","proxy","raid","ram","raw","reap","riot","risk","root","ruin","script","seg","sin","skull","slash","sleep","sly","snap","spawn","stack","stealth","storm","syn","term","threat","trace","trap","troll","true","wire","xeno","yield","zen"]
  const end = ["frauds","saint","spoof","wish","funds","glocks","lock","code","dawn","bypass","hack","slice","frags","wire","shell","void","flux","crash","stack","root","breach","leak","ghost","leet","exec","burn","panic","forge","blade","ware","phish","recon","xss","ace","agent","audit","axis","bash","bit","bomb","bug","byte","chain","chan","chaos","chip","cli","cloak","core","craft","crypt","cyber","data","death","dev","dox","drop","error","exec","exploit","flaw","flow","frame","freak","glitch","grid","grind","hack","hash","hex","hoax","host","inject","junk","key","kill","kit","leak","link","lite","lock","log","lord","mask","maul","mem","mind","mode","net","node","null","ops","overflow","ping","pirate","pit","port","pulse","punk","raid","ram","risk","root","run","scan","sect","seg","server","shell","shift","slash","sock","soft","source","spawn","spike","stack","storm","surge","swarm","sweep","sys","term","trace","trap","war","wave","web","wipe","wire","worm","wreck","zone"]
  
  return Array.from({ length: count }, () =>
    `${start[Math.floor(Math.random() * start.length)]}${end[Math.floor(Math.random() * end.length)]}`
  );
};

const checkUsernameAvailability = async (username: string) => {
  try {
    const headers = {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
      "accept-encoding": "gzip, deflate, br, zstd",
      "accept-language": "de-DE,de;q=0.6",
      "priority": "u=0, i",
      "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Brave\";v=\"134\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "none",
      "sec-fetch-user": "?1",
      "sec-gpc": "1",
      "upgrade-insecure-requests": "1",
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36"
  };
    const response = await fetch(`${apiUrl}${username}`, { headers });
    if (response.status === 204) {
      return false;
    } else if (response.status === 404) {
      return true;
    } else {
      throw new Error('Unexpected response from API');
    }
  } catch (error) {
    console.error(`Error checking username ${username}:`, error);
    return false;
  }
};

const App: React.FC = () => {
  const [usernames, setUsernames] = useState<string[]>([]);
  const handleGenerate = async () => {
    setUsernames([]);
    const newUsernames = generateRandomUsernames(15);
    for (const username of newUsernames) {
      const isAvailable: boolean = await checkUsernameAvailability(username); // will return true/false, true == available, false == not available
      if (isAvailable) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setUsernames((prev) => [...prev, username]);
      }
    }
  };

  return (
    <div className="app">
      <div className="app-container">
        <header className="app-header">
          <h1>gen.xavor.lol</h1>
          <p>mc user generator</p>
        </header>
        <div className="gen-container">
          <div className="button-controls">
            <GenerateBtn onGenerate={handleGenerate} />
          </div>
        </div>
        <div className="gen-results">
          <header className="gen-results-header">
            <p>usernames</p>
          </header>
          <div className="gen-results-list">
            <div className="gen-results-item">
              <p>usernames get checked for availability, all usernames below aren't taken.</p>
            </div>
            <div className="gen-results-item">
              <p>to generate usernames click 'generate usernames'</p>
            </div>
            {usernames.map((username, index) => (
              <div key={index} className="gen-results-item-available">
                <p>{username}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
