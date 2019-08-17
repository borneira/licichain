pragma solidity ^0.5.3;

contract Bid {

    address public owner;

    string public objeto;
    string public cpv;
    uint public fecha_inicio;
    uint public fecha_fin;
    uint public fecha_mesa_adm;
    uint public fecha_mesa_subj;
    uint public fecha_mesa_obj;
    string public org_contratacion;
    uint public importe_max;
    uint public importe_adj;
    string public PPT_hash;
    string public PCA_hash;
    string public criterios;

///TODO: Completar Oferta
    struct Oferta {
        string oferta_subj_hash;
        string oferta_obj_cifrada;
    }

    mapping(address => Oferta[]) public ofertas;

    /// Modifiers are a convenient way to validate inputs to
    /// functions. `onlyBefore` is applied to `bid` below:
    /// The new function body is the modifier's body where
    /// `_` is replaced by the old function body.
    modifier onlyBefore(uint _time) { require(now < _time); _; }
    modifier onlyAfter(uint _time) { require(now > _time); _; }

    constructor(
        string memory _objeto,
        uint _fecha_inicio,
        uint _fecha_fin,
        uint _fecha_mesa_adm,
        uint _fecha_mesa_obj,
        string memory _org_contratacion,
        uint _importe_max,
        string memory _PPT_hash,
        string memory _PCA_hash,
        string memory _criterios
    ) public {
        owner = msg.sender;

        objeto = _objeto;
        org_contratacion = _org_contratacion;
        fecha_inicio = _fecha_inicio;
        fecha_fin = _fecha_fin;
        fecha_mesa_adm = _fecha_mesa_adm;
        fecha_mesa_obj = _fecha_mesa_obj;
        importe_max = _importe_max;
        PPT_hash = _PPT_hash;
        PCA_hash = _PCA_hash;
        criterios = _criterios;
     }

     function setCpv(string  memory _CPV) public {
        require(msg.sender == owner);
        cpv = _CPV;
     }

     function setFecha_subj(uint _fecha_mesa_subj) public {
        require(msg.sender == owner);
        fecha_mesa_subj = _fecha_mesa_subj;
     }

     function setImporte_adj(uint _importe_adj) public {
         require(msg.sender == owner);
         importe_adj = _importe_adj;
     }
///     function getObjeto() public view returns (string memory _objeto) {
///        _objeto = objeto;
///     }
///     function getLicitacion() public view returns(string memory, string memory,
///                                                  uint, uint, uint, uint,
///                                                  uint, string memory, uint, uint,
///                                                  string memory, string memory, string memory) {
///        return (licitacion.objeto, licitacion.CPV, licitacion.fecha_inicio, licitacion.fecha_fin, licitacion.fecha_mesa_adm, licitacion.fecha_mesa_subj, licitacion.fecha_mesa_obj, licitacion.org_contratacion, licitacion.importe_max, licitacion.importe_adj, licitacion.PPT_hash, licitacion.PCA_hash, licitacion.criterios);
///     }

}
