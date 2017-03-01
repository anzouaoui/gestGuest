app.factory('DataServicesUsers', function ($cordovaSQLite, $ionicPlatform, ionicToast) {
    var db;

    /**
     * If you use the application with browser
     */
    function useWebSql() {
        db = window.openDatabase("guest.db", '1', 'guest', 1024 * 1024 * 100);
        console.log('using WebSql');
    }

    /**
     * If you use the application with an other device
     */
    function useSqlLite() {
        db = $cordovaSQLite.openDB(
            {
                name: "guest.db",
                location: 'default'
            }
        );
    }

    /**
     * Initialisation of the database
     */
    function initDatabase() {
        var queryCreate = 'CREATE TABLE IF NOT EXISTS USER (id integer primary key, name, email, password)';
        var queryAlter = 'ALTER TABLE USER ADD CONSTRAINT uc_password UNIQUE(password)';
        $cordovaSQLite.execute(db, queryCreate)
            .then(function (res) {
                console.log('Table created')
            });
        $cordovaSQLite.execute(db, queryAlter)
            .then(function (res) {
            })
    }

    /**
     * Test the used device
     */
    $ionicPlatform.ready(function () {
        if (window.cordova) {
            useSqlLite();
        } else {
            useWebSql();
        }
        initDatabase();
    });

    /**
     * Display any errors
     * @param err
     */
    function onErrorQuery(err) {
        console.log(err);
    }

    return {
        /**
         * Insert in the database
         * @param user
         */
        insert: function (user) {
            var query = "INSERT INTO USER (name, email, password) VALUES (?, ?, ?)";
            var insertSql = $cordovaSQLite.execute(db, query, [user.name, user.email, user.password]);
            return insertSql
                .then(function (res) {
                    console.log("insertId" + res.insertId);
                    ionicToast.show('Utilisateur créé', 'bottom', false, 2500);
                }), function (err) {
                console.error(err);
            }
        },
        /**
         * Update one database
         * @param user
         */
        update: function (user) {
            var query = "UPDATE USER set name = ?, password = ?";
            var updateSql = $cordovaSQLite.execute(db, query, [user.name, user.password]);
            return updateSql
                .then(function (res) {
                    ionicToast.show('Utilisateur modifié', 'bottom', false, 2500);
                }), function (err) {
                console.error(err);
            }
        },
        /**
         * Fetch all the database's rows
         * @param callback
         */
        fetchAll: function (callback) {
            var query = "SELECT * FROM USER";
            var fetchAllSql = $cordovaSQLite.execute(db, query);
            return fetchAllSql
                .then(function (res) {
                    var data = [];
                    var max = res.rows.length;
                    for (var i = 0; i < max; i++) {
                        data.push(res.rows.item(i));
                    }
                    callback(data);
                })
        },
        /**
         * Fetch one database row
         * @param id
         * @param callback
         */
        fetchById: function (id, callback) {
            var query = "SELECT * FROM USER where id = ?";
            var fetchByIdSql = $cordovaSQLite.execute(db, query, [id]);
            return fetchByIdSql
                .then(function (res) {
                    callback(res.rows.item(0));
                })
        },
        /**
         * Fetch the current user
         * @param email
         * @param password
         * @param callback
         */
        connection: function (email, password, callback) {
            var query = "SELECT * FROM USER where email = ? and password = ?";
            var connectionSql = $cordovaSQLite.execute(db, query, [email, password]);
            return connectionSql
                .then(function (res) {
                    var data = [];
                    var max = res.rows.length;
                    for (var i=0 ; i<max; i++) {
                        data.push(res.rows.item(i));
                    }
                    callback(data);
                })
        },
        /**
         * Delete one datase row
         * @param id
         * @returns {*}
         */
        delete: function (id) {
            var query = "DELETE FROM USER where id = ?";
            var deleteSql = $cordovaSQLite.execute(db, query, [id]);
            return deleteSql;
        },
        fetchPasswords: function (callback) {
            var query = "SELECT password FROM USER";
            var fetchPassword = $cordovaSQLite.execute(db, query);
            return fetchPassword
                .then(function (res) {
                    var data = [];
                    var max = res.rows.length;
                    for (var i = 0; i < max; i++) {
                        data.push(res.rows.item(i));
                    }
                    callback(data);
                })
        }
    }
});