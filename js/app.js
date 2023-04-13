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
      "https://bali-building-simulator-api.vercel.app/api/landDirection",
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
    <div className="md:grid md:grid-cols-3 md:gap-[20px] py-[10px] md:py-[30px] font-display">
      <form onSubmit={handleSubmit}>
        <p className="text-[14px] md:text-[16px] text-gray-500">
          Panca Wara Kepala Keluarga
        </p>
        <select
          className="rounded-[5px] px-[24px] py-[8px] md:py-[10px] outline-none w-full mt-2 drop-shadow-input appearance-none text-[14px] md:text-[16px]"
          onChange={(e) => setPancaWara(e.target.value)}
        >
          <option value="umanis">Umanis</option>
          <option value="paing">Paing</option>
          <option value="pon">Pon</option>
          <option value="wage">Wage</option>
          <option value="kliwon">Kliwon</option>
        </select>

        <p className="text-[14px] md:text-[16px] text-gray-500 mt-[16px]">
          Sapta Wara Kepala Keluarga
        </p>
        <select
          className="rounded-[5px] px-[24px] py-[8px] md:py-[10px] outline-none w-full mt-2 drop-shadow-input appearance-none text-[14px] md:text-[16px]"
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

        <button
          className={`w-full inline-flex items-center justify-center bg-primary text-white text-[14px] md:text-[16px] py-[8px] md:py-[10px] rounded-[5px] mt-[20px] md:mt-[30px] ${
            loading && "bg-primary/80 cursor-not-allowed"
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
        <div className="md:col-span-2 h-min bg-primary px-4 py-[8px] md:py-[10px] rounded-md text-white text-[14px] md:text-[16px] text-center md:text-left">
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
      "https://bali-building-simulator-api.vercel.app/api/locationDoor",
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
    <div className="md:grid md:grid-cols-3 md:gap-[20px] py-[10px] md:py-[30px] font-display">
      <form onSubmit={handleSubmit}>
        <p className="text-[14px] md:text-[16px] text-gray-500">
          Panjang Pekarangan (m)
        </p>
        <input
          type="text"
          pattern="^\d*(\.\d{0,5})?$"
          className="rounded-[5px] px-[24px] py-[8px] md:py-[10px] outline-none w-full mt-2 drop-shadow-input appearance-none text-[14px] md:text-[16px]"
          onChange={(e) => setYardLength(e.target.value)}
          required
        />

        <p className="text-[14px] md:text-[16px] text-gray-500 mt-[16px]">
          Arah Lahan
        </p>
        <select
          className="rounded-[5px] px-[24px] py-[8px] md:py-[10px] outline-none w-full mt-2 drop-shadow-input appearance-none text-[14px] md:text-[16px]"
          onChange={(e) => setLandDirection(e.target.value)}
        >
          <option value="utara">Utara</option>
          <option value="timur">Timur</option>
          <option value="selatan">Selatan</option>
          <option value="barat">Barat</option>
        </select>

        <button
          className={`w-full inline-flex items-center justify-center bg-primary text-white text-[14px] md:text-[16px] py-[8px] md:py-[10px] rounded-[5px] mt-[20px] md:mt-[30px] ${
            loading && "bg-primary/80 cursor-not-allowed"
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
        <div className="md:col-span-2 lg:grid lg:grid-cols-5 gap-2">
          <img
            className="col-span-3"
            src={`data:image/png;base64,${data.bytesImg}`}
            alt="Letak Pintu"
          />
          <div className="col-span-2 bg-primary rounded-md p-4 text-white my-4 lg:my-0 text-[14px] md:text-[16px]">
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
      "https://bali-building-simulator-api.vercel.app/api/buildingLocation",
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
    <div className="md:grid md:grid-cols-3 md:gap-[20px] py-[10px] md:py-[30px] font-display">
      <form onSubmit={handleSubmit}>
        <p className="text-[14px] md:text-[16px] text-gray-500">
          Arah Letak Pintu
        </p>
        <select
          className="rounded-[5px] px-[24px] py-[8px] md:py-[10px] outline-none w-full mt-2 drop-shadow-input appearance-none text-[14px] md:text-[16px]"
          onChange={(e) => setLandDirection(e.target.value)}
        >
          <option value="utara">Utara</option>
          <option value="timur">Timur</option>
          <option value="selatan">Selatan</option>
          <option value="barat">Barat</option>
        </select>

        <p className="text-[14px] md:text-[16px] text-gray-500 mt-[16px]">
          Panjang Telapak Kaki (cm)
        </p>
        <input
          type="text"
          pattern="^\d*(\.\d{0,5})?$"
          className="rounded-[5px] px-[24px] py-[8px] md:py-[10px] outline-none w-full mt-2 drop-shadow-input appearance-none text-[14px] md:text-[16px]"
          onChange={(e) => setFootLength(parseFloat(e.target.value))}
          required
        />

        <p className="text-[14px] md:text-[16px] text-gray-500 mt-[16px]">
          Lebar Telapak Kaki (cm)
        </p>
        <input
          type="text"
          pattern="^\d*(\.\d{0,5})?$"
          className="rounded-[5px] px-[24px] py-[8px] md:py-[10px] outline-none w-full mt-2 drop-shadow-input appearance-none text-[14px] md:text-[16px]"
          onChange={(e) => setSideFootLength(parseFloat(e.target.value))}
          required
        />

        <button
          className={`w-full inline-flex items-center justify-center bg-primary text-white text-[14px] md:text-[16px] py-[8px] md:py-[10px] rounded-[5px] mt-[20px] md:mt-[40px] ${
            loading && "bg-primary/80 cursor-not-allowed"
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

      {image && (
        <img
          className="col-span-2"
          src={image}
          alt="Tata Letak Bangunan Bali"
        />
      )}
    </div>
  );
}

function Simulator() {
  const [menu, setMenu] = React.useState("1");

  function handleMenu(menu) {
    setMenu(menu);
  }

  return (
    <div className="max-w-[1240px] mx-auto">
      {/* <div className="relative h-[200px] md:h-[300px] lg:h-[552px]">
        <img
          src="../assets/bg-image.jpg"
          className="h-full w-full object-cover object-center absolute -z-10"
        />
        <div className="absolute top-[50%] left-[128px] -translate-y-[50%]">
          <h1 className="inline-block bg-white/30 py-[16px] sm:pr-[81px] text-[24px] md:text-[38px] lg:text-[48px] font-bold font-display text-white">
            Karang Sukerti Simulator
          </h1>
        </div>
      </div> */}
      <div className="p-2">
        <div className="pt-[20px] md:grid md:grid-cols-3 md:gap-[20px]">
          <div
            onClick={() => handleMenu("1")}
            className={`bg-primary py-[8px] md:py-[10px] my-4 md:my-0 rounded-[5px] cursor-pointer ${
              menu === "1" && "bg-secondary"
            }`}
          >
            <p className="text-white text-center text-[14px] md:text-[16px] font-display">
              Arah Lahan Rumah
            </p>
          </div>
          <div
            onClick={() => handleMenu("2")}
            className={`bg-primary py-[8px] md:py-[10px] my-4 md:my-0 rounded-[5px] cursor-pointer ${
              menu === "2" && "bg-secondary"
            }`}
          >
            <p className="text-white text-center text-[14px] md:text-[16px] font-display">
              Letak Pintu Pekarangan
            </p>
          </div>
          <div
            onClick={() => handleMenu("3")}
            className={`bg-primary py-[8px] md:py-[10px] my-4 md:my-0 rounded-[5px] cursor-pointer ${
              menu === "3" && "bg-secondary"
            }`}
          >
            <p className="text-white text-center text-[14px] md:text-[16px] font-display">
              Tata Letak Bangunan
            </p>
          </div>
        </div>
        <div>
          {menu === "1" ? <Menu1 /> : menu === "2" ? <Menu2 /> : <Menu3 />}
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<Simulator />, app);
