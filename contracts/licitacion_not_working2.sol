pragma solidity ^0.5.3;

contract Bid {

    address public owner;

    struct Licitacion {
      string objeto;
      string CPV;
      uint fecha_inicio;
      uint fecha_fin;
      uint fecha_mesa_adm;
      uint fecha_mesa_subj;
      uint fecha_mesa_obj;
      string org_contratacion;
      uint importe_max;
      uint importe_adj;
      string PPTHash;
      string PCAHash;
      string criterios;
      uint numOfertas;
    }

    Licitacion public licitacion;

    struct Oferta {
        string empresa;
        string nonce;
        string empresaHash;
        string subjetivaHash;
        string objetivaHash;
        string objetivaCifrada;
        string objetiva;
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
        string memory objeto,
        uint fecha_inicio,
        uint fecha_fin,
        uint fecha_mesa_adm,
        uint fecha_mesa_obj,
        string memory org_contratacion,
        uint importe_max,
        string memory PPT_hash,
        string memory PCA_hash,
        string memory criterios
    ) public {
        owner = msg.sender;
        licitacion = Licitacion(objeto, '', fecha_inicio, fecha_fin, fecha_mesa_adm, 0, fecha_mesa_obj,
                                org_contratacion, importe_max, 0, PPT_hash, PCA_hash, criterios, 0);
     }

     function setCpv(string  memory CPV) public {
        require(msg.sender == owner);
        licitacion.CPV = CPV;
     }

     function setFecha_subj(uint fecha_mesa_subj) public {
        require(msg.sender == owner);
        licitacion.fecha_mesa_subj = fecha_mesa_subj;
     }

     function setImporte_adj(uint importe_adj) public {
         require(msg.sender == owner);
         licitacion.importe_adj = importe_adj;
     }

    function nuevaOferta(
                string memory empresaHash,
                string memory subjetivaHash,
                string memory objetivaHash,
                string memory objetivaCifrada) public returns (uint ofertaID) {
      ofertaID = licitacion.numOfertas++;
      ofertas[ofertaID] = Oferta('', '', empresaHash, subjetivaHash, objetivaHash, objetivaCifrada, '');
      ofertasIndex[empresaHash] = ofertaID;
    }

    function getOfertaID(string memory empresaHash) public returns (uint ofertaID) {
      ofertaID = ofertasIndex[empresaHash];
    }

    function revelaEmpresa(string memory empresaHash, string memory empresa, string memory nonce) public  {
      require(msg.sender == owner);
      uint ofertaID = ofertasIndex[empresaHash];
      ofertas[ofertaID].empresa = empresa;
      ofertas[ofertaID].nonce = nonce;
    }

    function revelaOfertaObjetiva(string memory empresaHash, string memory objetiva) public  {
      require(msg.sender == owner);
      uint ofertaID = ofertasIndex[empresaHash];
      ofertas[ofertaID].objetiva = objetiva;
    }

}
