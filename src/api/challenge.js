class Challenge {

    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.description = data.description;
        this.score = data.score;
        this.tip = data.tip;
        this.active = data.active;
        this.imageUrl = data.imageUrl;
        this.sources = data.sources;
        this.startDate = data.startDate;
        this.endDate = data.endDate;
        this.co2_savings = data.co2_savings;
    }
}

export {Challenge}