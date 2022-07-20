const app = document.getElementById("app");

function Menu1() {
  const [pancaWara, setPancaWara] = React.useState("umanis");
  const [saptaWara, setSaptaWara] = React.useState("redite");
  const [landDirection, setLandDirection] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fields = { pancaWara, saptaWara };
    setLoading(true);
    const response = await fetch(
      "https://simulatorapi.herokuapp.com/api/landDirection",
      {
        method: "POST",
        body: JSON.stringify(fields),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const json = await response.json();

    if (response.ok) {
      if (json.length > 1) {
        setLandDirection(`${json[0]} dan ${json[1]}`);
      } else {
        setLandDirection(json[0]);
      }
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1">
            <p>Panca Wara Kepala Keluarga</p>
            <select
              className="border border-[#557AD6] rounded-md p-2 focus:outline-[#557AD6] w-full"
              onChange={(e) => setPancaWara(e.target.value)}
            >
              <option value="umanis">Umanis</option>
              <option value="paing">Paing</option>
              <option value="pon">Pon</option>
              <option value="wage">Wage</option>
              <option value="kliwon">Kliwon</option>
            </select>
          </div>
          <div className="flex-1">
            <p>Sapta Wara Kepala Keluarga</p>
            <select
              className="border border-[#557AD6] rounded-md p-2 focus:outline-[#557AD6] w-full"
              onChange={(e) => setSaptaWara(e.target.value)}
            >
              <option value="redite">Redite</option>
              <option value="soma">Soma</option>
              <option value="anggara">Anggara</option>
              <option value="budha">Budha</option>
              <option value="wrespati">Wrespati</option>
              <option value="sukra">Sukra</option>
              <option value="saniscara">Saniscara</option>
            </select>
          </div>
        </div>
        <button
          className={`inline-flex items-center bg-[#557AD6] text-white py-2 px-5 rounded-lg mt-4 ${
            loading && "bg-[#7996df] cursor-not-allowed"
          }`}
          disabled={loading}
        >
          <svg
            className={`w-5 h-5 mr-3 -ml-1 text-white animate-spin ${
              !loading && "hidden"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Proses
        </button>
      </form>
      {landDirection && (
        <div className="bg-[#1982C4] p-2 rounded-md text-white">
          <p className="font-bold">Arah {landDirection}</p>
        </div>
      )}
    </div>
  );
}

function Menu2() {
  const [yardLength, setYardLength] = React.useState(0);
  const [landDirection, setLandDirection] = React.useState("utara");
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fields = { yardLength, landDirection };

    setLoading(true);

    const response = await fetch(
      "https://simulatorapi.herokuapp.com/api/locationDoor",
      {
        method: "POST",
        body: JSON.stringify(fields),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const json = await response.json();

    if (response.ok) {
      setData(json);
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1">
            <p>Panjang Pekarangan (m)</p>
            <input
              type="text"
              pattern="^\d*(\.\d{0,5})?$"
              className="border border-[#557AD6] rounded-md p-2 focus:outline-[#557AD6] w-full"
              onChange={(e) => setYardLength(e.target.value)}
              required
            />
          </div>
          <div className="flex-1">
            <p>Arah Lahan</p>
            <select
              className="border border-[#557AD6] rounded-md p-2 focus:outline-[#557AD6] w-full"
              onChange={(e) => setLandDirection(e.target.value)}
            >
              <option value="utara">Utara</option>
              <option value="timur">Timur</option>
              <option value="selatan">Selatan</option>
              <option value="barat">Barat</option>
            </select>
          </div>
        </div>
        <button
          className={`inline-flex items-center bg-[#557AD6] text-white py-2 px-5 rounded-lg mt-4 ${
            loading && "bg-[#7996df] cursor-not-allowed"
          }`}
          disabled={loading}
        >
          <svg
            className={`w-5 h-5 mr-3 -ml-1 text-white animate-spin ${
              !loading && "hidden"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Proses
        </button>
      </form>
      {data && (
        <div className="lg:grid lg:grid-cols-5 gap-2">
          <img
            className="col-span-3"
            src={`data:image/png;base64,${data.bytesImg}`}
            alt="Letak Pintu"
          />
          <div className="col-span-2 bg-[#1982C4] rounded-md p-4 text-white my-4 lg:my-0">
            <p className="uppercase font-semibold">
              Filosofi Letak Setiap Pintu
            </p>
            {Object.entries(data.philosophy).map(([k, v]) => (
              <p>{`${k}. ${v.bhsBali} = ${v.bhsIndonesia} (${v.locationValue})`}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Menu3() {
  const [landDirection, setLandDirection] = React.useState("utara");
  const [footLength, setFootLength] = React.useState(0);
  const [sideFootLength, setSideFootLength] = React.useState(0);
  const [image, setImage] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fields = { landDirection, footLength, sideFootLength };

    setLoading(true);

    const response = await fetch(
      "https://simulatorapi.herokuapp.com/api/buildingLocation",
      {
        method: "POST",
        body: JSON.stringify(fields),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const json = await response.json();

    if (response.ok) {
      setImage(`data:image/png;base64,${json.bytesImg}`);
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col lg:flex-row gap-2">
          <div className="flex-1">
            <p>Arah Letak Pintu</p>
            <select
              className="border border-[#557AD6] rounded-md p-2 focus:outline-[#557AD6] w-full"
              onChange={(e) => setLandDirection(e.target.value)}
            >
              <option value="utara">Utara</option>
              <option value="timur">Timur</option>
              <option value="selatan">Selatan</option>
              <option value="barat">Barat</option>
            </select>
          </div>
          <div className="flex-1">
            <p>Panjang Telapak Kaki (cm)</p>
            <input
              type="text"
              pattern="^\d*(\.\d{0,5})?$"
              className="border border-[#557AD6] rounded-md p-2 focus:outline-[#557AD6] w-full"
              onChange={(e) => setFootLength(parseFloat(e.target.value))}
              required
            />
          </div>
          <div className="flex-1">
            <p>Panjang Telapak Kaki Samping (cm)</p>
            <input
              type="text"
              pattern="^\d*(\.\d{0,5})?$"
              className="border border-[#557AD6] rounded-md p-2 focus:outline-[#557AD6] w-full"
              onChange={(e) => setSideFootLength(parseFloat(e.target.value))}
              required
            />
          </div>
        </div>
        <button
          className={`inline-flex items-center bg-[#557AD6] text-white py-2 px-5 rounded-lg mt-4 ${
            loading && "bg-[#7996df] cursor-not-allowed"
          }`}
          disabled={loading}
        >
          <svg
            className={`w-5 h-5 mr-3 -ml-1 text-white animate-spin ${
              !loading && "hidden"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Proses
        </button>
      </form>

      {image && <img src={image} alt="Tata Letak Bangunan Bali" />}
    </div>
  );
}

function Simulator() {
  const [menu, setMenu] = React.useState("1");

  function handleMenu(menu) {
    setMenu(menu);
  }

  return (
    <div className="max-w-[1240px] mx-auto p-2">
      <h1 className="text-center font-bold p-2 text-lg sm:text-xl">
        SIMULATOR ARSITEKTUR ASTA KOSALA - KOSALI <br /> BANGUNAN TRADISIONAL
        BALI
      </h1>
      <div className="md:grid md:grid-cols-3 md:gap-8">
        <div className="py-4">
          <div
            onClick={() => handleMenu("1")}
            className={`"w-full bg-[#557AD6] py-2 px-4 rounded-md text-white mt-2 cursor-pointer" ${
              menu !== "1" &&
              "bg-[#FFFFFF] border border-[#557AD6] text-[#557AD6] cursor-pointer"
            }`}
          >
            <p>Arah Lahan Rumah</p>
          </div>
          <div
            onClick={() => handleMenu("2")}
            className={`"w-full bg-[#557AD6] py-2 px-4 rounded-md text-white mt-2 cursor-pointer" ${
              menu !== "2" &&
              "bg-[#FFFFFF] border border-[#557AD6] text-[#557AD6] cursor-pointer"
            }`}
          >
            <p>Letak Pintu Pekarangan</p>
          </div>
          <div
            onClick={() => handleMenu("3")}
            className={`"w-full bg-[#557AD6] py-2 px-4 rounded-md text-white mt-2 cursor-pointer" ${
              menu !== "3" &&
              "bg-[#FFFFFF] border border-[#557AD6] text-[#557AD6] cursor-pointer"
            }`}
          >
            <p>Tata Letak Bangunan</p>
          </div>
        </div>
        <div className="col-span-2 py-4">
          <h3 className="text-center font-semibold uppercase mb-4">
            {menu === "1"
              ? "Menentuan Arah Lahan Rumah Berdasarkan Hari Lahir"
              : menu === "2"
              ? "Menentukan Letak Pintu Pekarangan"
              : "Menentukan Tata Letak Bangunan Menggunakan Konsep Sanga Mandala"}
          </h3>
          {menu === "1" ? <Menu1 /> : menu === "2" ? <Menu2 /> : <Menu3 />}
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<Simulator />, app);
