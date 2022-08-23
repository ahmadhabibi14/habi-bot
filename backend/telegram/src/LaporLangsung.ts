import { Scenes } from "telegraf";
import { LaporLangsung } from "../../src/performansi/Model";
import { updateHandle } from "../../src/teknisi/Service";

export const LaporLangsungIdGenerate =
  new Scenes.BaseScene<Scenes.SceneContext>("LaporLangsungIdGenerate");
export const LaporLangsungSpeedy = new Scenes.BaseScene<Scenes.SceneContext>(
  "LaporLangsungSpeedy"
);
export const LaporLangsungNamaPelanggan =
  new Scenes.BaseScene<Scenes.SceneContext>("LaporLangsungNamaPelanggan");
export const LaporLangsungCpPelanggan =
  new Scenes.BaseScene<Scenes.SceneContext>("LaporLangsungCpPelanggan");
export const LaporLangsungPerbaikan = new Scenes.BaseScene<Scenes.SceneContext>(
  "LaporLangsungPerbaikan"
);

async function saveData(id: string, data: LaporLangsung) {
  await updateHandle(data, id);
}

const LaporLangsungProperties: LaporLangsung = {
  type: "LaporLangsung",
  id_generate: "",
  no_speedy: "",
  nama_pelanggan: "",
  cp_pelanggan: "",
  perbaikan: "",
  done: false,
  date: new Date(),
  point: 1,
};

LaporLangsungIdGenerate.enter((ctx) => {
  ctx.reply("kamu memilih lapor langsung");
  ctx.reply("masukan id generate");
});
LaporLangsungIdGenerate.on("text", (ctx) => {
  if (ctx.update.message) {
    LaporLangsungProperties.id_generate = ctx.update.message.text;
  }
  ctx.scene.enter("LaporLangsungSpeedy");
});

LaporLangsungSpeedy.enter((ctx) => {
  ctx.reply("masukan no speedy");
});
LaporLangsungSpeedy.on("text", (ctx) => {
  if (ctx.update.message) {
    LaporLangsungProperties.no_speedy = ctx.update.message.text;
  }
  ctx.scene.enter("LaporLangsungNamaPelanggan");
});

LaporLangsungNamaPelanggan.enter((ctx) => {
  ctx.reply("masukan nama pelanggan");
});
LaporLangsungNamaPelanggan.on("text", (ctx) => {
  if (ctx.update.message) {
    LaporLangsungProperties.nama_pelanggan = ctx.update.message.text;
  }
  ctx.scene.enter("LaporLangsungCpPelanggan");
});

LaporLangsungCpPelanggan.enter((ctx) => {
  ctx.reply("masukan cp pelanggan");
});
LaporLangsungCpPelanggan.on("text", (ctx) => {
  if (ctx.update.message) {
    LaporLangsungProperties.cp_pelanggan = ctx.update.message.text;
  }
  ctx.scene.enter("LaporLangsungPerbaikan");
});

LaporLangsungPerbaikan.enter((ctx) => {
  ctx.reply("masukan cara perbaikan");
});
LaporLangsungPerbaikan.on("text", (ctx) => {
  if (ctx.update.message) {
    LaporLangsungProperties.perbaikan = ctx.update.message.text;
  }
  ctx.reply(
    "sumary\n" +
      "Id generate : " +
      LaporLangsungProperties.id_generate +
      "\n" +
      "No speedy : " +
      LaporLangsungProperties.no_speedy +
      "\n" +
      "Cp pelanggan : " +
      LaporLangsungProperties.cp_pelanggan +
      "\n" +
      "Nama pelanggan : " +
      LaporLangsungProperties.nama_pelanggan +
      "\n" +
      "Perbaikan : " +
      LaporLangsungProperties.perbaikan +
      "\n" +
      "Jika sudah benar tekan submit.",
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "submit", callback_data: "submit" },
            { text: "cancel", callback_data: "cancel" },
          ],
        ],
      },
    }
  );
});

LaporLangsungPerbaikan.on("callback_query", async (ctx) => {
  let id: string = "";
  if (ctx.callbackQuery.from) {
    id = ctx.callbackQuery.from.id.toString();
  }
  switch (ctx.callbackQuery.data) {
    case "submit":
      await saveData(id, LaporLangsungProperties);
      await ctx.reply("saving data...");
      ctx.scene.enter("Close");
      break;
    case "cancel":
      ctx.reply("membatalkan...");
      ctx.scene.enter("Close");
      break;
    default:
      console.log("");
      break;
  }
});
