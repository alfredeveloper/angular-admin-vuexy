export class Employee {

    constructor(
        public dni: Number,
        public first_name: String,
        public last_name: String,
        public birthday: Date,
        public phone: String,
        public email: String,
        public password: String,
        public offices: Array<Number>
    ) {}
}