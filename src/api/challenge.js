class Challenge {

    constructor(id,title,description, score, tip, active, imageUrl, sources, startDate, endDate, co2_savings) {
        this.id = id;
        this.title = title;
        this.description = description
        this.score = score
        this.tip = tip
        this.active = active
        this.imageUrl = imageUrl
        this.sources = sources
        this.startDate = startDate
        this.endDate = endDate
        this.co2_savings = co2_savings
    }
}

export {Challenge}