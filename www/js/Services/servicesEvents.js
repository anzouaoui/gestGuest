app.factory('DataServiceEvents', function ($cordovaSQLite, $ionicPlatform, ionicToast) {
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
            $cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS EVENT (id integer primary key, name, date, hour, place)')
                .then(function (res) {
                    console.log('Table created')
                });
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
             * @param event
             */
            insert: function (event) {
                var query = "INSERT INTO EVENT (name, date, hour, place) VALUES(?, ?, ?, ?)";
                var insertSql = $cordovaSQLite.execute(db, query, [event.name, event.date, event.hour, event.place]);
                return insertSql
                    .then(function (res) {
                        console.log("insertId" + res.insertId);
                        ionicToast.show('Evénement créé', 'bottom', false, 2500);
                    }), function (err) {
                    console.error(err);
                }
            },
            /**
             * Update one database row
             * @param event
             */
            update: function (event) {
                var query = "UPDATE EVENT set name = ?, date = ?, hour = ?, place = ? where id = ?";
                var updateSql = $cordovaSQLite.execute(db, query, [event.name, event.date, event.hour, event.place, event.id]);
                return updateSql
                    .then(function (res) {
                        ionicToast.show('Evénement modifié', 'bottom', false, 2500);
                    }), function(err) {
                    console.error(err);
                }
            },
            /**
             * Fetch all the database's rows
             * @param callback
             */
            fetchAll: function (callback) {
                var query = "SELECT * FROM EVENT";
                var fetchAllSql =  $cordovaSQLite.execute(db, query);
                return fetchAllSql
                    .then(function (res) {
                        var data = [];
                        var max = res.rows.length;
                        for (var i=0 ; i<max ; i++) {
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
                var query = "SELECT * FROM EVENT where id = ?";
                var fetchByIdSql = $cordovaSQLite.execute(db, query, [id]);
                return fetchByIdSql
                    .then(function (res) {
                        callback.res.row.item(0);
                    })
            },
            /**
             * Delete one datase row
             * @param id
             * @returns {*}
             */
            delete: function (id) {
                var query = "DELETE FROM EVENT where id = ?";
                var deleteSql = $cordovaSQLite.execute(db, query, [id]);
                return deleteSql;
            }

        }
    });
