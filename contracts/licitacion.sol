pragma solidity ^0.5.3;
pragma experimental ABIEncoderV2;

contract Bid {

    /// The address of the owner is stored in order to require the same identity for any change in the contract
    address public owner;

    /// Struct with the tendering information
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

  /// Struct for storing the relevant dates
  struct Fechas {
    uint fecha_inicio;
    uint fecha_fin;
    uint fecha_mesa_adm;
    uint fecha_mesa_subj;
    uint fecha_mesa_obj;
  }

  /// Public read access to the best bidder
  string public empresaAdjudicataria;

  /// Public read acces to the tendering information

  Licitacion public licitacion;

  /// Public read access to the relevant dates in the tendering process
  Fechas public fechas;

  /// Struct for storing evaluation data
  struct Valoracion {
    string objetiva;
    string subjetiva;
  }

  /// Struct for storing offers
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

  /// Variable and mappings for storing offers
  uint numOfertas;
  mapping (uint => Oferta) public ofertas;
  mapping (string => uint) ofertasIndex;


  /// Called to create a new tendering process
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

  /// Part of the tendering creation
  /// It's not in the constructor because of the EMV's stack limitation
  /// It should be called just after the constructor
  function setFechas (uint fecha_inicio, uint fecha_fin,
    uint fecha_mesa_adm, uint fecha_mesa_subj, uint fecha_mesa_obj) public {
    require(msg.sender == owner);
    fechas.fecha_inicio = fecha_inicio;
    fechas.fecha_fin = fecha_fin;
    fechas.fecha_mesa_adm = fecha_mesa_adm;
    fechas.fecha_mesa_subj = fecha_mesa_subj;
    fechas.fecha_mesa_obj = fecha_mesa_obj;
  }

  /// It stores a new offer for the tendering
  /// Only works between fecha_inicio and fecha_fin
  /// Only can be called by the public administration owning the tendering
  function nuevaOferta(
    string memory empresaHash,
    string memory subjetivaHash,
    string memory objetivaHash,
    string memory objetivaCifrada) public returns (uint ofertaID) {
    require (now >= fechas.fecha_inicio);
    require (now <= fechas.fecha_fin);
    require(msg.sender == owner);
    ofertaID = numOfertas++;
    Valoracion memory valoracion;
    valoracion.objetiva = '';
    valoracion.subjetiva = '';
    ofertas[ofertaID] = Oferta('', '', empresaHash, subjetivaHash, objetivaHash, objetivaCifrada, '', valoracion);
    ofertasIndex[empresaHash] = ofertaID;
  }

  /// Retrieves the ID of an offer from empresaHash
  /// Read only
  function getOfertaID(string memory empresaHash) public view returns (uint ofertaID) {
    ofertaID = ofertasIndex[empresaHash];
  }

  /// Reveals the name of the company
  /// Only works after fecha_mesa_adm
  /// Only can be called by the public administration owning the tendering
  function revelaEmpresa(string memory empresaHash, string memory empresa, string memory nonce) public  {
    require(msg.sender == owner);
    require (now >= fechas.fecha_mesa_adm);
    uint ofertaID = ofertasIndex[empresaHash];
    ofertas[ofertaID].empresa = empresa;
    ofertas[ofertaID].nonce = nonce;
  }

  /// Publish subjective evaluation
  /// Only works after fecha_mesa_subj
  /// Only can be called by the public administration owning the tendering
  function valoraOfertaSubjetiva(string memory empresaHash, string memory valoracion) public  {
    require(msg.sender == owner);
    require (now >= fechas.fecha_mesa_subj);
    uint ofertaID = ofertasIndex[empresaHash];
    ofertas[ofertaID].valoracion.subjetiva = valoracion;
  }

  /// Reveals the part of the offer evaluated using objective criteria
  /// Only works after fecha_mesa_obj
  /// Only can be called by the public administration owning the tendering
  function revelaOfertaObjetiva(string memory empresaHash, string memory objetiva) public  {
    require(msg.sender == owner);
    require (now >= fechas.fecha_mesa_obj);
    uint ofertaID = ofertasIndex[empresaHash];
    ofertas[ofertaID].objetiva = objetiva;
  }

  /// Publish objective evaluation
  /// Only works after fecha_mesa_obj
  /// Only can be called by the public administration owning the tendering
  function valoraOfertaObjetiva(string memory empresaHash, string memory valoracion) public  {
    require(msg.sender == owner);
    require (now >= fechas.fecha_mesa_obj);
    uint ofertaID = ofertasIndex[empresaHash];
    ofertas[ofertaID].valoracion.objetiva = valoracion;
  }

  /// Publish best bidder and tendering price
  /// Only works after fecha_mesa_obj
  /// Only can be called by the public administration owning the tendering
  function ofertaAdjudicataria(string memory empresaHash, uint importe) public {
    require(msg.sender == owner);
    require (now >= fechas.fecha_mesa_obj);
    uint ofertaID = ofertasIndex[empresaHash];
    licitacion.importe_adj = importe;
    empresaAdjudicataria = ofertas[ofertaID].empresa;
  }
}
