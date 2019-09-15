pragma solidity ^0.5.3;
pragma experimental ABIEncoderV2;

contract Bid {

  address public owner;

  struct Licitacion {
    string objeto;
    string org_contratacion;
    uint importe_max;
    uint importe_adj;
    string CPV;
    string PPTHash;
    string PCAHash;
    string criterios;
  }

  struct Fechas {
    uint fecha_inicio;
    uint fecha_fin;
    uint fecha_mesa_adm;
    uint fecha_mesa_subj;
    uint fecha_mesa_obj;
  }

  string public empresaAdjudicataria;
  Licitacion public licitacion;
  Fechas public fechas;

  struct Valoracion {
    string objetiva;
    string subjetiva;
  }

  struct Oferta {
    string empresa;
    string nonce;
    string empresaHash;
    string subjetivaHash;
    string objetivaHash;
    string objetivaCifrada;
    string objetiva;
    Valoracion valoracion;
  }

  uint numOfertas;
  mapping (uint => Oferta) public ofertas;
  mapping (string => uint) ofertasIndex;


  /// Modifiers are a convenient way to validate inputs to
  /// functions. `onlyBefore` is applied to `bid` below:
  /// The new function body is the modifier's body where
  /// `_` is replaced by the old function body.
  modifier onlyBefore(uint _time) { require(now < _time); _; }
  modifier onlyAfter(uint _time) { require(now > _time); _; }

  constructor(
    string memory _objeto,
    string memory _org_contratacion,
    uint _importe_max,
    string memory _CPV,
    string memory _PPTHash,
    string memory _PCAHash,
    string memory _criterios
  ) public {
    owner = msg.sender;
    licitacion.objeto = _objeto;
    licitacion.org_contratacion = _org_contratacion;
    licitacion.importe_max = _importe_max;
    licitacion.importe_adj = 0;
    licitacion.CPV = _CPV;
    licitacion.PPTHash = _PPTHash;
    licitacion.PCAHash = _PCAHash;
    licitacion.criterios = _criterios;
    empresaAdjudicataria = '';
  }

  function setFechas (uint fecha_inicio, uint fecha_fin, uint fecha_mesa_adm, uint fecha_mesa_subj, uint fecha_mesa_obj) public {
    require(msg.sender == owner);
    fechas.fecha_inicio = fecha_inicio;
    fechas.fecha_fin = fecha_fin;
    fechas.fecha_mesa_adm = fecha_mesa_adm;
    fechas.fecha_mesa_subj = fecha_mesa_subj;
    fechas.fecha_mesa_obj = fecha_mesa_obj;
  }

  function setImporte_adj(uint importe_adj) public {
    require(msg.sender == owner);
    require(now >= fechas.fecha_mesa_obj);
    licitacion.importe_adj = importe_adj;
  }

  function nuevaOferta(
    string memory empresaHash,
    string memory subjetivaHash,
    string memory objetivaHash,
    string memory objetivaCifrada) public returns (uint ofertaID) {
    ///    require (now >= fechas.fecha_inicio);
    ///    require (now <= fechas.fecha_fin);
    require(msg.sender == owner);
    ofertaID = numOfertas++;
    Valoracion memory valoracion;
    valoracion.objetiva = '';
    valoracion.subjetiva = '';
    ofertas[ofertaID] = Oferta('', '', empresaHash, subjetivaHash, objetivaHash, objetivaCifrada, '', valoracion);
    ofertasIndex[empresaHash] = ofertaID;
  }

  function getOfertaID(string memory empresaHash) public view returns (uint ofertaID) {
    ofertaID = ofertasIndex[empresaHash];
  }

  function revelaEmpresa(string memory empresaHash, string memory empresa, string memory nonce) public  {
    require(msg.sender == owner);
    ///    require (now >= fechas.fecha_mesa_adm);
    uint ofertaID = ofertasIndex[empresaHash];
    ofertas[ofertaID].empresa = empresa;
    ofertas[ofertaID].nonce = nonce;
  }

  function revelaOfertaObjetiva(string memory empresaHash, string memory objetiva) public  {
    require(msg.sender == owner);
    ///    require (now >= fechas.fecha_mesa_obj);
    uint ofertaID = ofertasIndex[empresaHash];
    ofertas[ofertaID].objetiva = objetiva;
  }

  function valoraOfertaSubjetiva(string memory empresaHash, string memory valoracion) public  {
    require(msg.sender == owner);
    ///    require (now >= fechas.fecha_mesa_subj);
    uint ofertaID = ofertasIndex[empresaHash];
    ofertas[ofertaID].valoracion.subjetiva = valoracion;
  }

  function valoraOfertaObjetiva(string memory empresaHash, string memory valoracion) public  {
    require(msg.sender == owner);
    ///    require (now >= fechas.fecha_mesa_obj);
    uint ofertaID = ofertasIndex[empresaHash];
    ofertas[ofertaID].valoracion.objetiva = valoracion;
  }
  function ofertaAdjudicataria(string memory empresaHash, uint importe) public {
    require(msg.sender == owner);
    ///    require (now >= fechas.fecha_mesa_obj);
    uint ofertaID = ofertasIndex[empresaHash];
    licitacion.importe_adj = importe;
    empresaAdjudicataria = ofertas[ofertaID].empresa;
  }
}
