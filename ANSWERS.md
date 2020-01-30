1) first of all, understanding the data is an important step to before write queries. Second, I would say that is highly recommend creating and using indexes. Another steps like, Eliminating cursors from the query, avoid use of Non-correlated Scalar sub query, Multi-statement table valued functions and multiple joins in a single query, must be follow in order to optimize queries.
 
2) Data WareHouses are databases that retrieve a lot of information linked to a Company's activities. Is a database that helps in making smart decisions to a company. Data warehouse is also used for analysis and generating reports due a vast range of different data type.

By definition, databases are any collection of data organized for storage and retrieval. Databases holds multiples tables, each consisting of columns and rows.

Data warehouse has more quality, consistency, volume of data and performance than database. Warehouse store data coming from results of user actions while database store data coming from CRUD operations.
 
3) A

4) SELECT user_id FROM user WHERE user_id IN 
(
    SELECT user_id FROM session WHERE session_id IN 
    (
        SELECT session_id FROM playback WHERE content_id IN 
        (
            SELECT content_id FROM content WHERE content_type_id IN 
            (
              SELECT content_type_id FROM content_type WHERE name = 'live'
            )
        )
        AND session_id IN
        (
        
          SELECT session_id FROM playback WHERE content_id IN 
          (
              SELECT content_id FROM content WHERE content_type_id IN 
              (
                SELECT content_type_id FROM content_type WHERE name = 'ondemand'
              )
          )
        )
    )
)

5) SELECT name FROM host WHERE host_id IN 
(
    SELECT host_id FROM content_host WHERE content_id IN 
    (
        SELECT content_id FROM content WHERE title = "AT 3 AM"
    )
)
