var TopHats = function(database,_){
    return {
        sellsTopSellingHats: function(limit){
            var allHats = _.flatMap(database, (seller) => seller.hats);
            var groupedHats = _.groupBy(allHats, 'id');
            var topHats = _.sortBy(groupedHats, (group) => group.length*-1).slice(0, limit);
    
            return _.sumBy(topHats, (group) => group.length);
        }
    }
}

module.exports = TopHats