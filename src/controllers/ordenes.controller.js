const ordenesCtrl = {};
import Ordenes from "../models/ordenes.js";

ordenesCtrl.renderOrdenes = async (req, res) => {
  const ordenes = await Ordenes.find().lean();
  return res.status(200).render("ordenes/allOrdenes", { ordenes });
};

ordenesCtrl.borrarOrdenes = async (req, res) => {
  try {
    await Ordenes.findByIdAndDelete(req.params.id);
    return res.status(200).redirect("/productos");
  } catch (error) {
    return res.status(404).render("ordenes/errorOrdenNoEncontrada");
  }
};

export default ordenesCtrl;
