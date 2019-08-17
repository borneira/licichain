pragma solidity ^0.5.3;

contract Bid {

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
        string PPT_hash;
        string PCA_hash;
        string criterios;
    }
    Licitacion public licitacion;

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
        uint _fecha_fin,
        uint _fecha_inicio,
        uint _fecha_mesa_adm,
        uint _fecha_mesa_obj,
        string memory _org_contratacion,
        uint _importe_max,
        string memory _PPT_hash,
        string memory _PCA_hash,
        string memory _criterios
    ) public {
        licitacion.objeto = _objeto;
        licitacion.org_contratacion = _org_contratacion;
        licitacion.fecha_fin = _fecha_fin;
        licitacion.fecha_inicio = _fecha_inicio;
        licitacion.fecha_mesa_adm = _fecha_mesa_adm;
        licitacion.fecha_mesa_obj = _fecha_mesa_obj;
        licitacion.importe_max = _importe_max;
        licitacion.PPT_hash = _PPT_hash;
        licitacion.PCA_hash = _PCA_hash;
        licitacion.criterios = _criterios;
     }

     function setCPV(string  memory _CPV) public {
        licitacion.CPV = _CPV;
     }

     function setFecha_subj(uint _fecha_mesa_subj) public {
        licitacion.fecha_mesa_subj = _fecha_mesa_subj;
     }

     function setImporte_adj(uint _importe_adj) public {
        licitacion.importe_adj = _importe_adj;
     }
     function getLicitacion() public view returns(string memory, string memory,
                                                  uint, uint, uint, uint,
                                                  uint, string memory, uint, uint,
                                                  string memory, string memory, string memory) {
        return (licitacion.objeto, licitacion.CPV, licitacion.fecha_inicio, licitacion.fecha_fin, licitacion.fecha_mesa_adm, licitacion.fecha_mesa_subj, licitacion.fecha_mesa_obj, licitacion.org_contratacion, licitacion.importe_max, licitacion.importe_adj, licitacion.PPT_hash, licitacion.PCA_hash, licitacion.criterios);
     }

}
