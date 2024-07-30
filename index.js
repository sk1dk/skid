const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#ffffff',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let player;
const playerSpeed = 200;

function preload() {
    this.load.image('player', 'https://media.discordapp.net/attachments/1147972308917555401/1267649292051550241/IMG_5718.png?ex=66a98de7&is=66a83c67&hm=0defb2fa76b4cdd1495aa962ed67414809c8299c63b36436270561c2e8a1f2fc&'); // Add the path to your player image
}

function create() {
    player = this.physics.add.sprite(400, 300, 'player');
    this.cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    player.setVelocity(0);

    if (this.cursors.left.isDown) {
        player.setVelocityX(-playerSpeed);
    } else if (this.cursors.right.isDown) {
        player.setVelocityX(playerSpeed);
    }

    if (this.cursors.up.isDown) {
        player.setVelocityY(-playerSpeed);
    } else if (this.cursors.down.isDown) {
        player.setVelocityY(playerSpeed);
    }
}