app.factory('DataServiceGuests', function ($cordovaSQLite, $ionicPlatform, ionicToast) {
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
        var queryCreate = 'CREATE TABLE IF NOT EXISTS GUEST (id integer primary key, firstName, lastName, email, confirmed, idEvent)';
        var queryAlter = 'ALTER TABLE GUEST ADD CONTRAINT fk_event FOREIGN KEY (id) REFERENCES (idEvent)';
        $cordovaSQLite.execute(db, queryCreate)
            .then(function (res) {
                console.log('table created');
            });
        $cordovaSQLite.execute(db, queryAlter)
            .then(function (res) {
                console.log('foreign key added');
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
         * @param guest
         */
        insert: function (guest) {
            var query = "INSERT INTO GUEST (firstName, lastName, email, confirmed, idEvent) VALUES(?, ?, ?, ?, ?)";
            var insertSql = $cordovaSQLite.execute(db, query, [guest.firstName, guest.lastName, guest.email, false, guest.idEvent]);
            return insertSql
                .then(function (res) {
                    console.log("insertId" + res.insertId);
                    ionicToast.show('Personne invtée', 'bottom', false, 2500);
                }), function (err) {
                console.error(err);
            }
        },
        /**
         * Update one database row
         * @param guest
         */
        update: function (guest) {
            var query = "UPDATE GUEST set firstName = ?, lastName = ?, email = ?, confirmed = ? where id = ?";
            var updateSql = $cordovaSQLite.execute(db, query, [guest.firstName, guest.lastName, guest.email, guest.confirmed, guest.id]);
            return updateSql
                .then(function (res) {
                    ionicToast.show('Invtié modifié', 'bottom', false, 2500);
                }), function (err) {
                console.error(err);
            }
        },
        /**
         * Update one database row
         * @param guest
         */
        updateConfirmed: function (guest) {
            var query = "UPDATE GUEST set confirmed = ? where id = ?";
            var updateSql = $cordovaSQLite.execute(db, query, [guest.confirmed, guest.id]);
            return updateSql
                .then(function (res) {
                    ionicToast.show('Invtié modifié', 'bottom', false, 2500);
                }), function (err) {
                console.error(err);
            }
        },
        /**
         * Fetch all the database's rows
         * @param callback
         */
        fetchAll: function (callback) {
            var query = "SELECT * FROM GUEST";
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
            var query = "SELECT * FROM GUEST where id = ?";
            var fetchByIdSql = $cordovaSQLite.execute(db, query, [id]);
            return fetchByIdSql
                .then(function (res) {
                    callback.res.row.item(0);
                })
        },
        /**
         * Fetch all the rows with the same idEvent
         * @param idEvent
         * @param callback
         */
        fetchByIdEvent: function (idEvent, callback) {
            var query = "SELECT * FROM GUEST where idEvent = ?";
            var fetchByIdEventSql = $cordovaSQLite.execute(db, query, [idEvent]);
            return fetchByIdEventSql
                .then(function (res) {
                    var data = [];
                    var max = res.rows.length;
                    for (var i=0 ; i<max ; i++) {
                        data.push(res.rows.item(i));
                    }
                    callback(data);
                })
        },
        fetchByGuests: function (idEvent) {
            var query = "SELECT COUNT(*) AS nbGuests FROM GUEST where idEvent = ?";
            var nbGuests = $cordovaSQLite.execute(db, query, [idEvent]);
            return nbGuests;
        },
        /**
         * Delete one database row
         * @param id
         * @returns {*}
         */
        delete: function (id) {
            var query = "DELETE FROM GUEST where id = ?";
            var deleteSql = $cordovaSQLite.execute(db, query, [id]);
            return deleteSql;
        }
    }
});