// --- HIỂN THỊ TASK LIST ---
const taskList = document.getElementById('taskList');
function showTasks() { taskList.style.display = 'block'; }
function closeTasks() { taskList.style.display = 'none'; }

// --- HIỂN THỊ IMG BOX ---
const imgBox = document.getElementById('imgBox');
function showImgBox() { imgBox.style.display = 'block'; }
function closeImgBox() { imgBox.style.display = 'none'; }

// --- HIỂN THỊ SHOP ---
const shopBox = document.getElementById('shopBox');
const shopItemsDiv = document.getElementById("shopItems");

// --- TIỀN NGƯỜI CHƠI ---
let money = 100;
document.getElementById("money").textContent = money;

// --- DANH SÁCH ITEM SHOP ---
const items = [
    { id: 1, name: "Flower Garden", price: 50, img: "bg/bg1.jpg", bought: false, equipped: false, bg:"bg/bg1.jpg" },
    { id: 2, name: "Minecraft House", price: 50, img: "bg/bg2.jpg", bought: false, equipped: false, bg:"bg/bg2.jpg"  },
    { id: 3, name: "Sunshine", price: 50, img: "bg/bg3.jpg", bought: false, equipped: false, bg:"bg/bg3.jpg"  },
    { id: 4, name: "Cherry Blossom", price: 50, img: "bg/bg4.jpg", bought: false, equipped: false, bg:"bg/bg4.jpg"  },
    { id: 5, name: "Summer Picnic", price: 50, img: "bg/bg5.jpg", bought: false, equipped: false, bg:"bg/bg5.jpg"   },
    { id: 6, name: "Dreamy Room", price: 50, img: "bg/bg6.jpg", bought: false, equipped: false, bg:"bg/bg6.jpg"   },
];


// --- RENDER SHOP ---
function renderShop() {
    shopItemsDiv.innerHTML = "";
    items.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("shop-item");
        if(item.bought) div.classList.add("bought");
        div.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <p>${item.name}</p>
            <p>${item.bought ? "Đã mua" : item.price + " 💰"}</p>
        `;
        div.onclick = () => handleItemClick(item.id);
        shopItemsDiv.appendChild(div);
    });
}

// --- CLICK ITEM SHOP ---
function handleItemClick(id) {
    const item = items.find(i => i.id === id);

    if(!item.bought) {
        // --- KIỂM TRA TIỀN ---
        if(money < item.price) {
            alert("Không đủ tiền để mua!");
            return;
        }
        // --- TRỪ TIỀN VÀ MUA ITEM ---
        money -= item.price;
        document.getElementById("money").textContent = money;
        item.bought = true;
        alert(`Bạn đã mua ${item.name}!`);
    } else {
        if(!item.equipped) {
            // Gỡ tất cả item khác
            items.forEach(i => i.equipped = false);
            item.equipped = true;
            document.body.style.background = `url('${item.bg}') no-repeat center / contain fixed, linear-gradient(to bottom, #ffeaa7, #fab1a0)`;
            document.body.style.backgroundRepeat = 'no-repeat';
            document.body.style.backgroundPosition = 'center';
            document.body.style.backgroundSize = 'contain';
            document.body.style.backgroundAttachment = 'fixed';
            alert(`Bạn đã trang bị ${item.name}`);
        } else {
            item.equipped = false;
            const stillEquipped = items.find(i => i.equipped);
            if(stillEquipped) {
                document.body.style.background = `url('${stillEquipped.bg}') no-repeat center / contain fixed, linear-gradient(to bottom, #ffeaa7, #fab1a0)`;
            } else {
                document.body.style.background = `url('bg/flower.jpg') no-repeat center / contain fixed, linear-gradient(to bottom, #ffeaa7, #fab1a0)`;
                document.body.style.backgroundRepeat = 'no-repeat';
                document.body.style.backgroundPosition = 'center';
                document.body.style.backgroundSize = 'contain';
                document.body.style.backgroundAttachment = 'fixed';
            }
            alert(`Bạn đã gỡ ${item.name}`);
        }
    }
    renderShop();
}

// --- MỞ / ĐÓNG SHOP ---
function showShopBox() { shopBox.style.display = 'block'; renderShop(); }
function closeShopBox() { shopBox.style.display = 'none'; }

// --- NHIỆM VỤ ---
let missions = [
    { name: "Pat", progress: 0, max: 10, reward: 20, claimed: false },
    { name: "Cuddle", progress: 0, max: 10, reward: 25, claimed: false },
    { name: "Hug", progress: 0, max: 10, reward: 30, claimed: false },
    { name: "Feed", progress: 0, max: 10, reward: 40, claimed: false },
    { name: "Poke", progress: 0, max: 10, reward: 50, claimed: false }
];
// --- LÀM MỚI NHIỆM VỤ --
let missionCooldown = false;
let cooldownTime = 10 * 60 * 1000; // 10 phút

function checkAllMissionsCompleted() {
    const allClaimed = missions.every(m => m.claimed === true);

    if (allClaimed && !missionCooldown) {
        missionCooldown = true;
        alert("Bạn đã hoàn thành toàn bộ nhiệm vụ! Chờ 10 phút để làm mới.");

        // Khóa tất cả nhiệm vụ
        document.querySelectorAll("#taskList li").forEach(li => {
            li.style.opacity = "0.4";
            li.style.pointerEvents = "none";
        });

        // Bắt đầu đếm thời gian
        setTimeout(resetAllMissions, cooldownTime);
    }
}

function resetAllMissions() {
    missions.forEach(m => {
        m.progress = 0;
        m.claimed = false;
    });

    // Reset giao diện
    document.querySelectorAll("#taskList li").forEach((li, index) => {
        li.style.opacity = "1";
        li.style.pointerEvents = "auto";
        li.style.color = "black";
        li.textContent = `${missions[index].name} (0/${missions[index].max})`;
    });

    missionCooldown = false;
    alert("Nhiệm vụ đã được làm mới sau 10 phút!");
}

// --- CẬP NHẬT NHIỆM VỤ ---
function updateMissionText(id) {
    const li = document.querySelector(`li[data-id="${id}"]`);
    li.textContent = `${missions[id].name} (${missions[id].progress}/${missions[id].max})`;
    if (missions[id].progress >= missions[id].max) li.style.color = "green";
}

// --- TĂNG TIẾN ĐỘ (đã thêm chặn cooldown) ---
function addProgress(id, amount = 1) {

    // Nếu đang trong thời gian cooldown → không cho tăng tiến độ
    if (missionCooldown) {
        alert("Nhiệm vụ đang làm mới. Vui lòng chờ 10 phút!");
        return;
    }

    if (missions[id].progress < missions[id].max) {
        missions[id].progress += amount;

        if (missions[id].progress > missions[id].max) {
            missions[id].progress = missions[id].max;
        }

        updateMissionText(id);
    }
}

// --- INTERACT ---
function interact(action) {
    switch(action) {
        case 'pat': addProgress(0, 10); break;
        case 'cuddle': addProgress(1, 10); break;
        case 'hug': addProgress(2, 10); break;
        case 'feed': addProgress(3, 10); break;
        case 'poke': addProgress(4, 10); break;
    }
}

// --- CLAIM NHIỆM VỤ ---
function claimReward(id) {
    const mission = missions[id];
    const li = document.querySelector(`li[data-id="${id}"]`);

    if (mission.progress < mission.max) { alert("Chưa hoàn thành nhiệm vụ!"); return; }
    if (mission.claimed) { alert("Bạn đã nhận rồi!"); return; }

    money += mission.reward;
    document.getElementById("money").textContent = money;

    mission.claimed = true;
    li.style.opacity = "0.4";
    li.style.pointerEvents = "none";
    checkAllMissionsCompleted();
alert(`Nhận được ${mission.reward}💰!`);
}
// --- LEVEL SYSTEM ---
let eevee = {
    lv: 9,
    points: 0,
    maxLv: 10,
    evolved: false
};

// Tính điểm cần để lên cấp: 2,4,6,...20
function pointsToNextLevel(lv) {
    return lv * 2;
}

function updateLevelBar() {
    const lvText = document.getElementById("lvText");
    const lvFill = document.getElementById("levelfill");

    lvText.textContent = `LV ${eevee.lv}`;

    if(eevee.evolved) {
        lvFill.style.width = "100%";
    } else {
        const percent = (eevee.points / pointsToNextLevel(eevee.lv)) * 100;
        lvFill.style.width = percent + "%";
    }
}

// --- TĂNG POINT KHI TƯƠNG TÁC ---
function gainEeveePoints(amount = 1) {
    if(eevee.evolved) return; // không tăng khi đã tiến hóa

    eevee.points += amount;

    while(eevee.points >= pointsToNextLevel(eevee.lv) && eevee.lv < eevee.maxLv) {
        eevee.points -= pointsToNextLevel(eevee.lv);
        eevee.lv += 1;
        alert(`🎉 Eevee lên cấp! Hiện tại LV ${eevee.lv}`);
    }

    // Kiểm tra tiến hóa khi đạt lv max
    if(eevee.lv === eevee.maxLv && !eevee.evolved) {
        eevee.evolved = true;
        evolveEevee();
    }

    updateLevelBar();
}

// --- HÀM TIẾN HÓA ---
function evolveEevee() {
    const evolutions = [
        { name: "Vaporeon", img: "images/vaporeon_pkm-removebg-preview.png" },
        { name: "Jolteon", img: "images/jolteon_pkm-removebg-preview.png" },
        { name: "Flareon", img: "images/flareon_pkm-removebg-preview.png" },
        { name: "Espeon", img: "images/espeon_pkm-removebg-preview.png" },
        { name: "Umbreon", img: "images/umbreon_pkm-removebg-preview.png" },
        { name: "Leafeon", img: "images/leafeon_pkm-removebg-preview.png" },
        { name: "Glaceon", img: "images/glaceon_pkm-removebg-preview.png" },
        { name: "Sylveon", img: "images/slyveon_pkm-removebg-preview.png" }
    ];

    const evo = evolutions[Math.floor(Math.random() * evolutions.length)];
    alert(`✨ Eevee tiến hóa thành ${evo.name}!`);

    // Thay đổi GIF Eevee thành ảnh tĩnh tiến hóa
    const eeveeImg = document.querySelector(".eeveegif img");
    eeveeImg.src = evo.img;
    // Tăng kích thước ảnh tiến hóa
    eeveeImg.style.width = "180px";   // to hơn GIF ban đầu (vd: 150px → 180px)
    eeveeImg.style.height = "180px";

    // Thanh LV đầy
    document.getElementById("levelfill").style.width = "100%";
}

// --- THAY ĐỔI INTERACT ĐỂ TĂNG POINT LV ---
function interact(action) {
    switch(action) {
        case 'pat': addProgress(0, 10); gainEeveePoints(1); break;
        case 'cuddle': addProgress(1, 10); gainEeveePoints(1); break;
        case 'hug': addProgress(2, 10); gainEeveePoints(1); break;
        case 'feed': addProgress(3, 10); gainEeveePoints(2); break; // feed +2 điểm
        case 'poke': addProgress(4, 10); gainEeveePoints(1); break;
    }
}
