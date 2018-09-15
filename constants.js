let status = {
    unassigned: "unassigned",
    requested: "requested",
    assigned: "assigned",
    picked: "picked",
    delivered: "delivered",
    expired: "expired"
};

let jwt_secret = 'RESTFULAPIs';

module.export = {
    status: status,
    jwt_secret: jwt_secret
}