import { useState } from "react";
import "./App.css";

type WeatherData = {
  city: string;
  temperature: number;
  humidity: number;
  wind: number;
  rainChance: number;
};

type DaylightData = {
  city: string;
  sunrise: string;
  sunset: string;
  daylightHours: string;
};

type TravelData = {
  city: string;
  advisoryLevel: string;
  routeStatus: string;
  delayRisk: string;
  visibility: string;
};

type JourneyResponse = {
  city: string;
  weather: WeatherData;
  daylight: DaylightData;
  travel: TravelData;
};

type BlockchainResponse = {
  success: boolean;
  message: string;
  txId: string;
  recordedAt: string;
};

function App() {
  const [city, setCity] = useState("");
  const [journeyData, setJourneyData] = useState<JourneyResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recording, setRecording] = useState(false);
  const [recordMessage, setRecordMessage] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [recordedAt, setRecordedAt] = useState("");

  const API_BASE_URL =
    "https://bookish-funicular-r49vjqjr6559hp5g-3000.app.github.dev";

  const clearBlockchainState = () => {
    setRecordMessage("");
    setTransactionId("");
    setRecordedAt("");
  };

  const handleSearch = async () => {
    if (!city.trim()) {
      setError("Please enter a destination city.");
      setJourneyData(null);
      clearBlockchainState();
      return;
    }

    try {
      setLoading(true);
      setError("");
      clearBlockchainState();

      const response = await fetch(
        `${API_BASE_URL}/api/journey/${city.trim().toLowerCase()}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch journey data.");
      }

      const data: JourneyResponse = await response.json();
      setJourneyData(data);
    } catch (_error) {
      setError("Something went wrong while fetching journey data.");
      setJourneyData(null);
      clearBlockchainState();
    } finally {
      setLoading(false);
    }
  };

  const handleRecordOnBlockchain = async () => {
    if (!journeyData) {
      setRecordMessage("Please search for a destination first.");
      setTransactionId("");
      setRecordedAt("");
      return;
    }

    try {
      setRecording(true);
      setRecordMessage("");

      const response = await fetch(`${API_BASE_URL}/api/blockchain/record`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(journeyData)
      });

      if (!response.ok) {
        throw new Error("Failed to record journey data.");
      }

      const data: BlockchainResponse = await response.json();

      setRecordMessage(data.message);
      setTransactionId(data.txId);
      setRecordedAt(data.recordedAt);
    } catch (_error) {
      setRecordMessage("Something went wrong while recording journey data.");
      setTransactionId("");
      setRecordedAt("");
    } finally {
      setRecording(false);
    }
  };

  const summaryCity = journeyData?.city ?? "--";
  const summaryRisk = journeyData?.travel.delayRisk ?? "--";
  const summaryRoute = journeyData?.travel.routeStatus ?? "--";
  const summaryAdvisory = journeyData?.travel.advisoryLevel ?? "--";
  const summaryVisibility = journeyData?.travel.visibility ?? "--";
  const summaryDaylight = journeyData?.daylight.daylightHours ?? "--";

  return (
    <div className="app-shell">
      <main className="dashboard">
        <header className="hero">
          <div className="hero-badge">Hybrid Algorand DApp</div>
          <h1>TravelSafe</h1>
          <p>
            Verify journey conditions through destination-based weather,
            daylight, travel advisory analysis, and blockchain-backed recording.
          </p>
        </header>

        <section className="search-panel">
          <div className="search-box">
            <input
              type="text"
              placeholder="Enter destination city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={handleSearch} disabled={loading}>
              {loading ? "Searching..." : "Check Journey"}
            </button>
          </div>

          <p className="helper-text">
            Supported destinations: London, Manchester, Birmingham, Liverpool,
            Leeds, Bristol
          </p>

          {loading && <p className="status-message">Loading journey data...</p>}
          {error && <p className="error-message">{error}</p>}
        </section>

        <section className="blockchain-panel">
          <div className="blockchain-header">
            <p className="panel-label">JOURNEY SUMMARY</p>
            <h2>Current destination risk snapshot</h2>
          </div>

          <div className="blockchain-result">
            <div className="result-card">
              <span>Destination</span>
              <strong>{summaryCity}</strong>
            </div>
            <div className="result-card">
              <span>Route Status</span>
              <strong>{summaryRoute}</strong>
            </div>
            <div className="result-card">
              <span>Advisory Level</span>
              <strong>{summaryAdvisory}</strong>
            </div>
            <div className="result-card">
              <span>Delay Risk</span>
              <strong>{summaryRisk}</strong>
            </div>
            <div className="result-card">
              <span>Visibility</span>
              <strong>{summaryVisibility}</strong>
            </div>
            <div className="result-card">
              <span>Daylight Window</span>
              <strong>{summaryDaylight}</strong>
            </div>
          </div>
        </section>

        <section className="cards-grid">
          <article className="card">
            <div className="card-header">
              <h2>Weather Conditions</h2>
              <span className="card-tag">Forecast Layer</span>
            </div>

            <div className="card-content">
              <div className="data-row">
                <span>City</span>
                <strong>{journeyData?.weather.city ?? "--"}</strong>
              </div>
              <div className="data-row">
                <span>Temperature</span>
                <strong>{journeyData?.weather.temperature ?? "--"}</strong>
              </div>
              <div className="data-row">
                <span>Humidity</span>
                <strong>{journeyData?.weather.humidity ?? "--"}</strong>
              </div>
              <div className="data-row">
                <span>Wind</span>
                <strong>{journeyData?.weather.wind ?? "--"}</strong>
              </div>
              <div className="data-row">
                <span>Rain Chance</span>
                <strong>{journeyData?.weather.rainChance ?? "--"}</strong>
              </div>
            </div>
          </article>

          <article className="card">
            <div className="card-header">
              <h2>Daylight Conditions</h2>
              <span className="card-tag">Visibility Layer</span>
            </div>

            <div className="card-content">
              <div className="data-row">
                <span>City</span>
                <strong>{journeyData?.daylight.city ?? "--"}</strong>
              </div>
              <div className="data-row">
                <span>Sunrise</span>
                <strong>{journeyData?.daylight.sunrise ?? "--"}</strong>
              </div>
              <div className="data-row">
                <span>Sunset</span>
                <strong>{journeyData?.daylight.sunset ?? "--"}</strong>
              </div>
              <div className="data-row">
                <span>Daylight Hours</span>
                <strong>{journeyData?.daylight.daylightHours ?? "--"}</strong>
              </div>
            </div>
          </article>

          <article className="card">
            <div className="card-header">
              <h2>Travel Advisory</h2>
              <span className="card-tag">Route Layer</span>
            </div>

            <div className="card-content">
              <div className="data-row">
                <span>City</span>
                <strong>{journeyData?.travel.city ?? "--"}</strong>
              </div>
              <div className="data-row">
                <span>Advisory Level</span>
                <strong>{journeyData?.travel.advisoryLevel ?? "--"}</strong>
              </div>
              <div className="data-row">
                <span>Route Status</span>
                <strong>{journeyData?.travel.routeStatus ?? "--"}</strong>
              </div>
              <div className="data-row">
                <span>Delay Risk</span>
                <strong>{journeyData?.travel.delayRisk ?? "--"}</strong>
              </div>
              <div className="data-row">
                <span>Visibility</span>
                <strong>{journeyData?.travel.visibility ?? "--"}</strong>
              </div>
            </div>
          </article>
        </section>

        <section className="blockchain-panel">
          <div className="blockchain-header">
            <p className="panel-label">BLOCKCHAIN RECORD</p>
            <h2>Record current journey verification</h2>
          </div>

          <button
            className="blockchain-button"
            onClick={handleRecordOnBlockchain}
            disabled={recording}
          >
            {recording ? "Recording..." : "Record Journey on Blockchain"}
          </button>

          {recordMessage && <p className="blockchain-message">{recordMessage}</p>}

          {(transactionId || recordedAt) && (
            <div className="blockchain-result">
              <div className="result-card">
                <span>Transaction ID</span>
                <strong>{transactionId || "--"}</strong>
              </div>
              <div className="result-card">
                <span>Recorded At</span>
                <strong>{recordedAt || "--"}</strong>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;